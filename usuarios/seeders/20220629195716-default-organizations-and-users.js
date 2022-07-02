'use strict'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.bulkInsert('organizations', [{
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
      ], { transaction: t })
      const organizationIds = (await queryInterface.sequelize.query(
        'SELECT id from organizations;', { transaction: t }
      ))[0].map(org => org.id)
      await queryInterface.bulkInsert('users', [{
        username: 'pepe',
        password: '7c9e7c1494b2684ab7c19d6aff737e460fa9e98d5a234da1310c97ddf5691834',
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: organizationIds[0]
      },
      {
        username: 'pepa',
        password: '321cb76b7d6e43ef6917ee54fd8fa0e7fa99ba97c7e0b6fc7866139e7cb8c9c3',
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: organizationIds[0]
      },
      {
        username: 'pepo',
        password: 'd50d3319bccca99d3093b689745b168cc79ecfd0e18e3e80be6d8c6ad1061407',
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: organizationIds[1]
      }], { transaction: t })
    })
    
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('organizations', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}
