const mongoose = require('mongoose');
require('dotenv').config

const mongoConnection = process.env.ENVIRONMENT === 'PROD' ? process.env.MONGODB_URI : 'mongodb://sherlock:root@localhost:6000/test'

const isConnectionActive = async() => {
    const conn = await mongoose.createConnection(mongoConnection).asPromise();
    return conn.readyState === 1;
}


module.exports = {
    isConnectionActive
}