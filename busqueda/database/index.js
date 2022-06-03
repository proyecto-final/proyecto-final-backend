const mongoose = require('mongoose');
require('dotenv').config

const isConnectionActive = async() => {
    return mongoose.connection.readyState === 1;
}


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        })
    } catch (err){
        console.log(err)
        return false
    }
} 


module.exports = {
    isConnectionActive,
    connectDB
}