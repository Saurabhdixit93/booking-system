const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();

const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/BOOKING_API');
        console.log(`MongoDB connected  successfull : ${conn.connection.host}`);
    }catch(err){
        console.log(`Error In Connecting MongoDB: ${err}`);
        process.exit(1);
    }
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());


// booking router
app.use('/api/booking' ,require('./routers/bookings'));

// user create router
app.use('/api/user' ,require('./routers/user'));




ConnectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`Successfull Connected With the Port:${PORT}`);
    });
})