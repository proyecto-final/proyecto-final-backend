// Option 1: Passing a connection URI
//for tests with mock db
//prod
//const sequelize = new Sequelize('mysql://SherlockRoot:SH3rl0ckR00t@database-testing.csd1nltwgzc6.us-east-1.rds.amazonaws.com:3306/test')
//testing

/* segun la docu
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
})
*/ 

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
require('dotenv').config()
const basename = path.basename(__filename)
const db = {}
// TODO: change this to a config file
const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db