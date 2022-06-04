const express = require('express')
const db = require('./models/index')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})

const connectToDatabase = async() => {
  db.sequelize.sync({ force: true }).then(() => {
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
