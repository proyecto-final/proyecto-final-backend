const express = require('express')
const db = require('./models/index')
const cookieParser = require("cookie-parser")
require('dotenv').config()

const app = express()
// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(require('./middlewares/checkToken'))
app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})

// Connect to DB
const connectToDatabase = async() => {
  db.sequelize.sync({ alter: true }).then(() => {
    console.log('SUCESSFULLY CONNECTED!')
    console.log('-----------------------Database sync finish! -----------------------')
  }).catch((err) => {
     if(err.original.code == 'PROTOCOL_CONNECTION_LOST'){
      setTimeout(async() => {
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
