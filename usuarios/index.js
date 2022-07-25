const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./models/index')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const { exec } = require('child_process')
const YAML = require('yamljs')
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(require('./middlewares/checkToken'))
app.use('/api', require('./routes'))
app.use('/api', require('./routes/external'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})

const swaggerDocument = YAML.load('./swagger.yaml')

const runCommand = (stringCommand) => {
  return new Promise((resolve, reject) => {
    const migrate = exec(
      stringCommand,
      { env: process.env },
      err => (err ? reject(err) : resolve())
    )
    migrate.stdout.pipe(process.stdout)
    migrate.stderr.pipe(process.stderr)
  })
}
const executeMigrations = async () => {
  await runCommand('npx sequelize-cli db:seed:undo:all')
  await runCommand('npx sequelize-cli db:seed:all')
}
const connectToDatabase = async () => {
  db.sequelize.sync({ alter: true, force: true }).then(async () => {

    console.log('SUCESSFULLY CONNECTED!')
    console.log('EXECUTING MIGRATIONS!')
    if (process.env.ENVIRONMENT === 'DEV') {
      await executeMigrations()
    }
    console.log('SUCESSFULLY MIGRATED!')
    console.log('-----------------------Database sync finish! -----------------------')
  }).catch((err) => {
    setTimeout(async () => {
      console.log('Database not ready yet. Trying to re-connect')
      await connectToDatabase()
    }, 3000) //wait 3 seconds before reconnect
    console.log('ERROR ON DATABASE SYNC')
    console.log(err)
  })
}
if (process.env.ENVIRONMENT === 'DEV') {
  console.log('-----------------------Init database sync!-----------------------')
  connectToDatabase()
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
