const express = require('express')
const db = require('./models/index')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})

// TODO: make this depend on env variable
console.log('-----------------------Init database sync!-----------------------')
db.sequelize.sync({ force: true }).then(() => {
  console.log('-----------------------Database synced-----------------------')
}).catch((err) => {
  console.log('ERROR ON DATABASE SYNC')
  console.log(err)
})