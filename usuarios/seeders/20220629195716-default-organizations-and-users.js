'use strict'

module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('organizations', [{
        name: 'Organization 1',
        color: '#ff0000',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Organization 2',
        color: '#111111',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Organization 3',
        color: '#ff0000',
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Organization 4',
        color: '#ff0000',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Organization 5',
        color: '#ff0000',
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ])
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('organizations', null, {})
  }
}
