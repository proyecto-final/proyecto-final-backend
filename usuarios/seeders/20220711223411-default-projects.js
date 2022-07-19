'use strict'

module.exports = {
  async up (queryInterface) {
    const organizationIds = (await queryInterface.sequelize.query(
      'SELECT id from organizations;'))[0].map(org => org.id)
    await queryInterface.bulkInsert('projects', [{
      name: 'Proyecto 1',
      prefix: 'proy1',
      color: '#111111',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[0]
    },
    {
      name: 'Proyecto 2',
      prefix: 'proy2',
      color: '#ff00ff',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[0]
    },
    {
      name: 'Proyecto 3',
      prefix: 'proy3',
      color: '#00ff00',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[0]
    },
    {
      name: 'Proyecto 4',
      prefix: 'proy4',
      color: '#222222',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[1]
    },
    {
      name: 'Proyecto 5',
      prefix: 'proy5',
      color: '#333300',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[1]
    }
    ])
    const projectIds = (await queryInterface.sequelize.query(
      'SELECT id from projects;'))[0].map(proj => proj.id)
    const userIds = (await queryInterface.sequelize.query(
      'SELECT id from users;'))[0].map(user => user.id)
    await queryInterface.bulkInsert('project_users', [{
      projectId: projectIds[0],
      userId: userIds[0],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      projectId: projectIds[0],
      userId: userIds[1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      projectId: projectIds[1],
      userId: userIds[0],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('projects', null, {})
  }
}
