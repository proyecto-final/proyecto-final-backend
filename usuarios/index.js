const express = require('express')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express()

const db = require('./models/index')
app.use(express.json())
app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})


const setSwagger = () => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Sherlock User Module API",
        version: "1.0.0",
        description: "Sherlock security user module interface",
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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
const connectToDatabase = async () => {
  db.sequelize.sync({ alter: true }).then(() => {
    console.log('SUCESSFULLY CONNECTED!')
    console.log('-----------------------Database sync finish! -----------------------')
  }).catch((err) => {
    if (err.original.code == 'PROTOCOL_CONNECTION_LOST') {
      setTimeout(async () => {
        console.log('Database not ready yet. Trying to re-connect')
        await connectToDatabase()
      }, 3000) //wait 3 seconds before reconnect
    } else {
      console.log('ERROR ON DATABASE SYNC')
      console.log(err)
    }
  })
}

console.log('-----------------------Init database sync!-----------------------')
connectToDatabase()
setSwagger()
