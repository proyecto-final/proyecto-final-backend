const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
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

    setSwagger () {
        const options = {
          definition: {
            openapi: "3.0.0",
            info: {
              title: "Sherlock timeline Module API",
              version: "1.0.0",
              description: "Sherlock security timeline module interface",
            },
            servers: [
              {
                url: `http://localhost:${process.env.PORT}`,
              }
            ],
          },
          apis: ["./routes/*.js"]
        }
        const specs = swaggerJSDoc(options)
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
      }

    routes() {
        this.app.use('/api', require('../routes'))
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App running on port ${process.env.PORT}`)
        })
        this.setSwagger()
    }
}

module.exports = Server