'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {})
  }
}
