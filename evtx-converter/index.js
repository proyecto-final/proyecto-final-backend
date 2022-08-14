const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const fileUpload = require('express-fileupload')
const YAML = require('yamljs')
const app = express()
const MEGABYTES_5 = 5 * 1024 * 1024


app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: MEGABYTES_5
  },
  abortOnLimit: true
}))
app.use(cors({
 origin: ['http://sherlock-security.s3-website-us-east-1.amazonaws.com', 'https://d33yco26qnv6iv.cloudfront.net/'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support,
})) //TBD if its needed
app.use(express.json())
app.use('/api', require('./converter'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})


const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
