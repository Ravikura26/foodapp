const express = require('express'); 
const { addOrder, getResOrder, getUserOrder, getOrderDetail, deleteOrder, updateOrderDetail, getAllPending, getTotoDeliver, getDDeliver } = require('../controllers/orderController');
const { verifyToken } = require('../helpers/bcrypt');
const router = express.Router();

router.post('/',verifyToken, addOrder);
router.get('/res',verifyToken, getResOrder);
router.get('/user',verifyToken, getUserOrder);
router.get('/driver',verifyToken, getAllPending);
router.get('/todo-deliver',verifyToken, getTotoDeliver);
router.get('/d-deliver',verifyToken, getDDeliver);
router.get('/order/:id',verifyToken, getOrderDetail);
router.put('/order/:id',verifyToken, updateOrderDetail);
router.delete('/order/:id',verifyToken, deleteOrder);
 

module.exports = router;
