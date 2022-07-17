const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const fileUpload = require('express-fileupload')
const YAML = require('yamljs')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(fileUpload({
  createParentPath: true
}))
app.use('/api', require('./routes'))
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedtopology: true
}).then(() => {
  console.log('Connected to MongoDB')
})



const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

