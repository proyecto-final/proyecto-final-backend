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
      validate: { len: [2,32] }
    },
    prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2,16] }
    },
    color:  {
      type: DataTypes.STRING,
      defaultValue: '#6492E6',
      allowNull: false,
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name', 'organizationId']
      },
      {
        unique: true,
        fields: ['prefix', 'organizationId']
      },
    ]
  })
  Project.associate = (models) => {
    Project.belongsTo(models.organization,
      {foreignKey: {name: 'organizationId'}}
    )
    Project.belongsToMany(models.user,
      { through: 'project_users' }
    )
  }
  Project.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    if (values.users) {
      values.users.forEach(user => {
        delete user.password
        delete user.token
      })
    }
    return values
  }
  return Project
}
