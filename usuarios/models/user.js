const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password:  {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  })
  return User
}