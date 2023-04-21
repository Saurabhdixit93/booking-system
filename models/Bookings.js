const mongoose = require('mongoose');
const moment = require('moment');


const bookingSchema = new mongoose.Schema({

    type: {
        type: String, //like car boking ,flight , train
    },
    userId: {
        type: String,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
    },
    details: {
        type: Object //booking details specific to each type
    },
    createdAt: {
        type: Date,
        default: moment().toDate(),
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Booking' , bookingSchema);