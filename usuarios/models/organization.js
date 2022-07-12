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
    }
  })
  Organization.associate = (models) => {
    Organization.hasMany(models.user, {
      foreignKey: 'organizationId'
    })
  }
  return Organization
}
