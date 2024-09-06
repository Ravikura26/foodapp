const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");


const getUserProfile = async (req, res, next) => {
    const id = req.user.id;
  
    try {
        const existingUser = await profileModel.findOne({ userId: id });
        if (!existingUser) {
            const error = new Error('Profile does not exist.');
            error.statusCode = 400;
            return next(error);
        }

        res.status(200).json({
            message: 'Profile data fetched successfully',
            success: true,
            data: existingUser
        });
    } catch (error) {
        next(error);
    }
};

const updateaUserProfile = async (req, res, next) => {
    const id = req.user.id;
  
    try {
        const {fullName,address,VNO,phone,openingTime,banner} =  req.body;
        const existingUser = await profileModel.findOne({ userId: id });
        if (!existingUser) {
            const error = new Error('Profile does not exist.');
            error.statusCode = 400;
            return next(error);
        }

        if (VNO !== undefined) existingUser.VNO = VNO; 
        if (fullName !== undefined) existingUser.fullName = fullName; 
        if (address !== undefined) existingUser.address = address; 
        if (phone !== undefined) existingUser.phone = phone; 
        if (openingTime !== undefined) existingUser.openingTime = openingTime; 
        if (banner !== undefined) existingUser.banner = banner; 

        await existingUser.save();

        res.status(200).json({
            message: 'Profile data updated successfully',
            success: true, 
        });
    } catch (error) {
        next(error);
    }
};

 
module.exports = {
    updateaUserProfile, 
    getUserProfile
}