const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

class Server {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.routes()
        this.start()
        this.connectDB()
        .then(() => console.log('connected with MongoDB'))
        .catch((err) => console.log('unable to connect with MongoDB') )
    }
    
    connectDB () {
            return mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedtopology: true
            })
    } 


    routes() {
        this.app.use('/api', require('../routes'))
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App running on port ${process.env.PORT}`)
        })
    }
}

module.exports = Server