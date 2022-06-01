const express = require('express')
require('dotenv').config()

class Server {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.routes()
        this.start()
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