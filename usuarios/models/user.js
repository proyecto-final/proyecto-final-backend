const { DataTypes } = require('sequelize')
const crypto = require('crypto')

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
      },
      defaultValue: 'User'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2,32] }
    },
    password:  {
      type: DataTypes.STRING,
      //does not require pass length validation because it is hashed and salted and the length is always the same 64 characters
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(512),
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
    },
    attemptsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mfaSecret: {
      type: DataTypes.STRING(512),
      allowNull: true,
      unique: true
    },
    preAuthToken: {
      type: DataTypes.STRING(512),
      allowNull: true,
      unique: true
    },
  })

  User.beforeCreate((user) => {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex')
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
    delete values.mfaSecret
    delete values.preAuthToken
    return values
  }
  return User
}
