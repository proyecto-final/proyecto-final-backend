const mongoose = require('mongoose');
require('dotenv').config


const connectDB = async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        })
} 


module.exports = {
    connectDB
}