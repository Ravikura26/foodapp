const express = require('express'); 
const { addItem, getAllItemOfRestaurant, getAllItem,deleteItem, ItemDetails } = require('../controllers/itemController');
const { verifyToken } = require('../helpers/bcrypt');
const router = express.Router();

router.post('/',verifyToken, addItem);
router.get('/',getAllItem );
router.get('/restaurant-items',verifyToken,getAllItemOfRestaurant );
router.get('/item/:id',ItemDetails );
router.delete('/:id', deleteItem); 

module.exports = router;
