const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
exports.signup =async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user){
            return next(new createError('User already exists!', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
    
const newUser = await User.create({
    ...req.body,
     password: hashedPassword,
});

//ASSIGN JWT (json web token)
const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
    expiresIn: '90d',
});

res.status(201).json({
    status: 'success',
    message: 'User registered sucessfully',
    token,
});

    } catch (error) {
        next(error);
    }
};

//LOGGING USER
exports.login =async () => {};