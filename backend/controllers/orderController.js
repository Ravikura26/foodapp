const orderModel = require("../models/orderModel");
const profileModel = require("../models/profileModel");
 
const groupItemsByAddedBy = (items) => {
  return items.reduce((result, item) => {
    const addedById = item.addedBy;

    if (!result[addedById]) {
      result[addedById] = [];
    }

    result[addedById].push(item);
    return result;
  }, {});
};
 
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
 
const calculateItems = (items) => {
  return items.map((item) => ({
    itemId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));
};

const addOrder = async (req, res, next) => {
  const id = req.user.id;
  const { items } = req.body;

  const groupedItems = groupItemsByAddedBy(items);

  try {
    const orders = [];

    for (const addedBy in groupedItems) {
      const newOrder = new orderModel({
        addedBy,
        orderedBy: id,
        items: calculateItems(groupedItems[addedBy]),
        total: calculateTotal(groupedItems[addedBy]),
      });

      const savedOrder = await newOrder.save();
      orders.push(savedOrder);
    }

    res.status(201).json({ message: 'Orders added successfully.', success: true, data:orders });
  } catch (error) {
    next(error);
  }
};

// get fpr res
const getResOrder = async (req, res, next) => {
    const id = req.user.id;
  
    try {
      const orders = await orderModel.find({ addedBy: id })
        .populate('addedBy')
        .populate('orderedBy');

        
  
      if (orders.length === 0) {
        return res.status(200).json({ message: 'No orders foundss.', success: true, data: [] });
      }
  
      res.status(200).json({ message: 'Orders retrieved successfully.', success: true, data: orders });
    } catch (error) {
      next(error);
    }
  };

  const getUserOrder = async (req, res, next) => {
    const id = req.user.id;
  
    try {
      const orders = await orderModel.find({ orderedBy: id })
        .populate('addedBy')
        .populate('orderedBy');
  
      if (orders.length === 0) {
        return res.status(200).json({ message: 'No orders found.', success: true, data: [] });
      }
  
      res.status(200).json({ message: 'Orders retrieved successfully.', success: true, data: orders });
    } catch (error) {
      next(error);
    }
  };

  const getAllPending = async (req, res, next) => {
    try {
        // Fetch all orders with a "Pending" status and that are accepted
        const orders = await orderModel.find({ deliveyStatus: "Accepted", delivery:null})
            .populate('addedBy')
            .populate('orderedBy');

        // Check if no orders were found
        if (!orders.length) {
            return res.status(200).json({ 
                message: 'No pending orders found.', 
                success: true, 
                data: [] 
            });
        }

        // Send the found orders
        res.status(200).json({ 
            message: 'Pending orders retrieved successfully.', 
            success: true, 
            data: orders 
        });
    } catch (error) {
        // Pass any errors to the error handler middleware
        next(error);
    }
};

const getTotoDeliver = async (req, res, next) => {
  const id = req.user.id; 
  
  try { 
      const orders = await orderModel.find({ deliveyStatus: "Accepted", delivery:id})
          .populate('addedBy')
          .populate('delivery')
          .populate('orderedBy');
          

      // Check if no orders were found
      if (orders.length == 0) {
          return res.status(200).json({ 
              message: 'No pending to deliver found.', 
              success: true, 
              data: [] 
          });
      }

      // Send the found orders
      res.status(200).json({ 
          message: 'Pending orders retrieved successfully.', 
          success: true, 
          data: orders 
      });
  } catch (error) {
      // Pass any errors to the error handler middleware
      next(error);
  }
};

const getDDeliver = async (req, res, next) => {
  const id = req.user.id; 
  
  try { 
      const orders = await orderModel.find({ deliveyStatus: "Delivered", delivery:id})
          .populate('addedBy')
          .populate('delivery')
          .populate('orderedBy'); 
          

      // Check if no orders were found
      if (orders.length == 0) {
          return res.status(200).json({ 
              message: 'No pending to deliver found.', 
              success: true, 
              data: [] 
          });
      }

      // Send the found orders
      res.status(200).json({ 
          message: 'Pending orders retrieved successfully.', 
          success: true, 
          data: orders 
      });
  } catch (error) {
      // Pass any errors to the error handler middleware
      next(error);
  }
};
  const getOrderDetail = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const order = await orderModel.findById(id)
        .populate('addedBy')
        .populate('orderedBy');
  
      if (!order) {
        return res.status(200).json({ message: 'No order found.', success: false, data: null });
      }
  
      const addedById = order.addedBy._id;
      const orderedById = order.orderedBy._id;
      const deliverById = order.delivery?._id;
  
      const profileUser = await profileModel.findOne({ userId: orderedById });
      const profileres = await profileModel.findOne({ userId: addedById });
      const profileDri = await profileModel.findOne({ userId: deliverById });
  
      const orderData = {
        ...order._doc,
        profileUser,
        profileres,
        profileDri
        
      };
  
      res.status(200).json({ message: 'Order retrieved successfully.', success: true, data: orderData });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteOrder = async (req, res, next) => {
    const { id } = req.params;
  
    try { 
      const order = await orderModel.findByIdAndDelete(id);
   
      if (!order) {
        return res.status(200).json({ message: 'No order found.', success: false, data: null });
      }
   
      res.status(200).json({ message: 'Order deleted successfully.', success: true });
    } catch (error) { 
      return next(error);
    }
  };
  
  const updateOrderDetail = async (req, res, next) => {
    const   dId  = req.user.id;
    const {id} = req.params;
    const {paymentStatus,deliveyStatus,delivery,isAccepted,rejectionReason} =  req.body;

  
    try {
      const orders = await orderModel.findById(id);
  
      if (!orders) {
        return res.status(200).json({ message: 'No order found.', success: false, data: null });
      }
      if (rejectionReason !== undefined) orders.rejectionReason = rejectionReason; 
      if (delivery !== undefined) orders.delivery = dId; 
      if (paymentStatus !== undefined) orders.paymentStatus = paymentStatus; 
      if (deliveyStatus !== undefined) orders.deliveyStatus = deliveyStatus; 
      if (isAccepted !== undefined) orders.isAccepted = isAccepted; 
      await orders.save();

  
      res.status(200).json({ message: 'Order updated successfully.', success: true});
    } catch (error) {
      next(error);
    }
  };
 

module.exports = {
  addOrder,
  getResOrder,
  getUserOrder,
  getOrderDetail,
  deleteOrder,
  updateOrderDetail,
  getAllPending,
  getTotoDeliver,
  getDDeliver
};
