const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  })
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    console.log(values)
    delete values.token
    delete values.password
    return values
  }
  return User
}
