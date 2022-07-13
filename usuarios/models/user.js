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
      validate: { len: [2,32] },
      unique: true

    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email no es válido'
        }
      }
    }, 
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: {
          args:[['Owner', 'User']],
          msg: 'El rol no es válido'
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2,32] }
    },
    password:  {
      type: DataTypes.STRING,
      validate: { len: [8,32] },
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
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
