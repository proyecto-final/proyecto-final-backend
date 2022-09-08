require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const fileUpload = require('express-fileupload')
const YAML = require('yamljs')
require('./controllers/scheduler')

const MEGABYTES_5 = 5 * 1024 * 1024
const app = express()

app.use(cors({
  origin: 'https://d33yco26qnv6iv.cloudfront.net',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support,
}))
app.use(express.json())
app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: MEGABYTES_5
  },
  abortOnLimit: true
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
}).catch(err => {
  console.log(err)
})



const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

