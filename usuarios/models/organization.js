const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Organization = sequelize.define('organization', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2,32] },
      unique: true
    },
    color:  {
      type: DataTypes.STRING,
      defaultValue: '#6492E6',
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    invitationToken: {
      type: DataTypes.STRING,
      unique: true
    },
    invitationTokenCreationDate: {
      type: DataTypes.DATE
    }
  })
  Organization.associate = (models) => {
    Organization.hasMany(models.user, {
      foreignKey: 'organizationId'
    })
  }
  Organization.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.invitationToken
    return values
  }
  return Organization
}
