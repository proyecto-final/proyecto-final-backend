const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Project = sequelize.define('project', {
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
    prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2,16] },
      unique: true
    },
    color:  {
      type: DataTypes.STRING,
      defaultValue: '#6492E6',
      allowNull: false,
    }
  })
  Project.associate = (models) => {
    Project.belongsTo(models.organization,
      {foreignKey: {name: 'organizationId'}}
    )
    Project.belongsToMany(models.user,
      { through: 'project_users' }
    )
  }
  return Project
}
