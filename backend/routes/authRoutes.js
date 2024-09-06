const express = require('express'); 
const {   LoginUser, RegisterUser } = require('../controllers/authController');
const { getUserProfile, updateaUserProfile } = require('../controllers/profileController');
const { verifyToken } = require('../helpers/bcrypt');

const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
 
// Proflie
router.get('/profile',verifyToken,getUserProfile);
router.put('/profile',verifyToken,updateaUserProfile);



module.exports = router;
