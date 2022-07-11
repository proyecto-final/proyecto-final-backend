'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const organizationIds = (await queryInterface.sequelize.query(
      'SELECT id from organizations;'))[0].map(org => org.id)
    await queryInterface.bulkInsert('users', [{
      username: 'pepe',
      password: '7c9e7c1494b2684ab7c19d6aff737e460fa9e98d5a234da1310c97ddf5691834',
      email: 'email1@gmail.com',
      name: 'pepe',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[0]
    },
    {
      username: 'pepa',
      password: '321cb76b7d6e43ef6917ee54fd8fa0e7fa99ba97c7e0b6fc7866139e7cb8c9c3',
      email: 'email2@gmail.com',
      name: 'pepa',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[0]
    },
    {
      username: 'pepo',
      password: 'd50d3319bccca99d3093b689745b168cc79ecfd0e18e3e80be6d8c6ad1061407',
      email: 'email3@gmail.com',
      name: 'pepo',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: organizationIds[1]
    }])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
