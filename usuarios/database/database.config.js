const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
//for tests with mock db
//prod
//const sequelize = new Sequelize('mysql://SherlockRoot:SH3rl0ckR00t@database-testing.csd1nltwgzc6.us-east-1.rds.amazonaws.com:3306/test')
//testing
const sequelize = new Sequelize('mysql://root:root@mysql:3306/test')

/* segun la docu
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
});
*/ 

const connectDB = async() => {
    let connected = false
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        connected = true
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      return connected
}

module.exports = {connectDB}