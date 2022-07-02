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
      validate: { len: [1,7] },
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
