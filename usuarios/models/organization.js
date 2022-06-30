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
      unique: true
    },
    color:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
  Organization.associate = (models) => {
    Organization.hasMany(models.user, {
      foreignKey: 'organizationId'
    })
  }
  return Organization
}
