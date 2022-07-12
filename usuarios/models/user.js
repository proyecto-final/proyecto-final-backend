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
    password:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })
  User.associate = (models) => {
    User.belongsTo(models.organization,
      {foreignKey: {name: 'organizationId'}}
    )
    User.belongsToMany(models.project,
      { through: 'project_users' }
    )
  }
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.token
    delete values.password
    return values
  }
  return User
}
