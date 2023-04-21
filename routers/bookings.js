const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');

const secretKey = 'heyYouYesYou!2'
const jwt = require('jsonwebtoken');

// create new booking

router.post('/create-booking', verifyToken ,async (req,res) => {
    try{
        const {userId} = req.userId;
        const bookingExists = await Booking.findOne({userId});
        if(bookingExists){
            return res.send(400).json({
                message: 'Booking Already Created With this userID',
                bookingExists
            });
        }
        const booking = await new Booking({
            ...req.body, 
            userId: req.userId 
        });
        const result = await booking.save();
        return res.status(200).json({
            message: 'booking created Succesfully ',
            result
        });

    }catch(error){
        console.log(error, 'error booking');
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});

// get all bookings from db

router.get('/all-bookings', verifyToken, async (req,res) => {
    try{
        const bookings = await  Booking.find({ userId: req.userId });
        return res.status(200).json({
            message: 'All Bookings bellow',
            bookings
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});

// get a single booking by ID

router.get('/booking/:id', verifyToken, async (req,res) => {
    const _id = req.params.id;
    const userId =  req.userId;
    try{
        const booking = await Booking.findOne({ _id, userId });
        if (!booking){
            return res.status(400).json({
                message: 'Booking Not Availbe with given ID'
            });
        }
        return res.status(200).json({
            message: 'Booking with given ID bellow',
            booking
        });

    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});

// update booking by ID

router.put('/update-booking/:id', verifyToken , async (req , res ) =>{
    try{
       const booking = await Booking.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
       if (!booking){
            return res.status(400).json({
                message: 'Booking Not Availbe with given ID To Update'
            });
        }
        return res.status(200).json({
            message: 'Booking Updated Successfully With Given ID',
            booking
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});

// delete Booking by ID
router.delete('/delete-booking/:id', verifyToken , async(req ,res) =>{
    try{
        const booking = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!booking){
            return res.status(400).json({
                message: 'Booking Not Availbe with given ID To Delete'
            });
        }
        return res.status(200).json({
            message: 'Booking Deleted Successfully With Given ID',
            booking
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal server Error',
            error
        });
    }
});


function verifyToken(req, res, next) {
    // Get the authorization header value
    const bearerHeader = req.headers['x-access-token'];
  
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split the header value into two parts: Bearer and the token
      const bearerToken = bearerHeader.split(' ')[1];
  
      // Verify the token
      jwt.verify(bearerToken, secretKey, (err, decoded) => {
        if (err) {
          console.log('Token is invalid' , err);
          // Token is invalid or expired, return 401 Unauthorized
          return res.status(401).json({ message: 'Unauthorized' });
        }
        // Token is valid, attach decoded token to request object and call next middleware
        req.token = decoded;
        next();
      });
    } else {
      // Bearer token is missing, return 401 Unauthorized
      console.log('Error Bearer token is missing');
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  

module.exports = router;