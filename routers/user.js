const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// create user
router.post('/create-account' , async(req,res) => {
    const {email , password} = req.body
    const userExists = await User.findOne({ email, password });
    try{
        if(userExists){
            return res.send(400).json({
                message: 'User Already Register with this Email',
                userExists
            });
        }else{
            const user = await new User({
                email,
                password
            });
            await user.save();
            return res.status(200).json({
                message: 'User Created',
                email: user.email,
                id: user._id,
            });
        }
    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});

// login user

router.post('/login-account' , async (req,res) =>{
    const {email ,password} = req.body;
    try{
        const user = await User.findOne({email , password});
        if(!user){
            return res.status(400).json({
                message: 'Did not find the user wrong email or password or create new Account with this email'
            });
        }else{
            const token = jwt.sign({id: user._id}, 'heyYouYesYou!2');
            return res.status(200).json({
                message: 'Login Successfull, here is your token',
                token
            });
        }
    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});


module.exports = router;