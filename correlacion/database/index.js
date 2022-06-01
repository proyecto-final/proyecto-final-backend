const mongoose = require('mongoose');
require('dotenv').config

const mongoConnection = process.env.ENVIRONMENT === 'PROD' ? process.env.MONGODB_URI : 'mongodb://sherlock:root@mongo:27017'

const isConnectionActive = async() => {
    return mongoose.connection.readyState === 1;
}

const connectDB = async () => {

    try {
        await mongoose.connect(mongoConnection, {
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