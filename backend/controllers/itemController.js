const itemModel = require("../models/itemModel");
const userModel = require("../models/userModel");
const profileModel = require("../models/profileModel");


const addItem = async(req, res, next) => { 
    const id = req.user.id; 
    try {
        const user = await userModel.findById(id);
        if (!user) {
            const error = new Error('User is not listed.');
            error.statusCode = 400;
            return next(error);
        }

        const item = new itemModel({...req.body, addedBy:id});
        await item.save();

        res
            .status(201)
            .json({message: 'Item added successfully.', success: true});
    } catch (error) {
        next(error);
    }
};

const getAllItemOfRestaurant = async (req, res, next) => {
    const id= req.user.id;

    try { 
        const items = await itemModel.find({ addedBy: id }); 
        if (items.length === 0) {
            const error = new Error('No items found for this restaurant.');
            error.statusCode = 404;
            return next(error);
        }
 
        res.status(200).json({ message: 'All items listed successfully.', success: true, data:items });
    } catch (error) {
        next(error);
    }
};

const ItemDetails = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the item by its ID
        const item = await itemModel.findById(id);
        if (!item) {
            const error = new Error('No item found.');
            error.statusCode = 404;
            return next(error);
        }

        // Find the profile of the user who added the item
        const profileDetails = await profileModel.findOne({ userId: item.addedBy });

        // Combine the item and profile details into a single response object
        const data = {
            ...item._doc,  // Use ._doc to get the raw object data from the Mongoose document
            addedByProfile: profileDetails
        };

        res.status(200).json({ message: 'Item details fetched successfully.', success: true, data: data });
    } catch (error) {
        next(error);
    }
};



const deleteItem = async(req, res, next) => {
    const {id} = req.params;

    try {
        const item = await itemModel.findByIdAndDelete(id);

        if (!item) {
            const error = new Error('item not found.');
            error.statusCode = 404;
            return next(error);
        }

        res
            .status(200)
            .json({message: 'item deleted successfully.', success: true});
    } catch (error) {
        next(error);
    }
};

const getAllItem= async(req,res)=>{
    try { 
        const items = await itemModel.find().populate('addedBy'); 
        if (items.length === 0) {
            const error = new Error('No items found .');
            error.statusCode = 404;
            return next(error);
        }
 
        res.status(200).json({ message: 'All items listed successfully.', success: true, data:items });
    } catch (error) {
        next()
}
}

module.exports = {
    addItem,
    getAllItemOfRestaurant,
    getAllItem,
    deleteItem,ItemDetails
}