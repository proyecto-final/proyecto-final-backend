const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})