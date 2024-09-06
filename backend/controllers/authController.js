const { hashPassword, matchPassword, generateToken } = require("../helpers/bcrypt"); 
const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");


const RegisterUser = async (req, res,next) => {
    const { name, email, password, role } = req.body;
 
    if (!name || !email || !password || !role) {
        const error = new Error('All fields (name, email, password, role) are required.');
        error.statusCode = 400;  
        return next(error);
    }

    try { 
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const error = new Error('User with this email already exists.');
            error.statusCode = 400;  
            return next(error);
        }
 
        const hashedPassword = hashPassword(password);
 
        const newUser = new userModel({
            name,
            email,
            role,
            password: hashedPassword
        });
 
        await newUser.save();
        const profile = new profileModel({
            email:newUser.email,
            userId:newUser?._id
        });

        await profile.save();
 
        res.status(201).json({
            message: 'User registered successfully',
            success: true
        });
    } catch (error) { 
         next(error);
    }
};
const LoginUser = async (req, res,next) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        const error = new Error('Email and password are required.');
        error.statusCode = 400; 
        return next(error);
    }

    try { 
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            const error = new Error('User with this email does not exist.');
            error.statusCode = 404; // Not Found
            return next(error);
        }
 
        const isMatch = matchPassword(password, existingUser.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials.');
            error.statusCode = 400;  
            return next(error);
        }
 
        const token = generateToken(existingUser._id);
 
        res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            token,
            user:{
                name : existingUser.name,
                email:existingUser.email,
                role:existingUser.role
            }
        });
    } catch (error) { 
         next(error);
    }
};

module.exports = {
    RegisterUser,
    LoginUser
}