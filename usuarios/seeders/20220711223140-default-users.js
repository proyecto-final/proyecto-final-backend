'use strict'

module.exports = {
  async up (queryInterface) {
    const organizationIds = (await queryInterface.sequelize.query(
      'SELECT id from organizations;'))[0].map(org => org.id)
    await queryInterface.bulkInsert('users', [{
      username: 'pepe',
      password: '7c9e7c1494b2684ab7c19d6aff737e460fa9e98d5a234da1310c97ddf5691834',
      email: 'email1@gmail.com',
      name: 'pepe',
      role: 'Owner',
      enabled: true,
      mfaSecret: '715b6c70416375546954674b4a6d492c39423c635842344c2554734844723f61',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true,
      organizationId: organizationIds[0],
      attemptsCount: 0
    },
    {
      username: 'pepa',
      password: '321cb76b7d6e43ef6917ee54fd8fa0e7fa99ba97c7e0b6fc7866139e7cb8c9c3',
      email: 'email2@gmail.com',
      name: 'pepa',
      role: 'User',
      enabled: true,
      mfaSecret: '5261644f2e484f3e35252c4a46302c6f7131342c674e684b7a4544334a7b7579',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      organizationId: organizationIds[0],
      attemptsCount: 0
    },
    {
      username: 'pepo',
      password: 'd50d3319bccca99d3093b689745b168cc79ecfd0e18e3e80be6d8c6ad1061407',
      email: 'email3@gmail.com',
      name: 'pepo',
      role: 'Owner',
      enabled: true,
      mfaSecret: '294b55573f62784b6674263e6c5b7665303652752a4d236667533864544d7676',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      organizationId: organizationIds[1],
      attemptsCount: 0
    },
    {
      username: 'juancue99',
      password: 'd50d3319bccca99d3093b689745b168cc79ecfd0e18e3e80be6d8c6ad1061407',
      email: 'email4@gmail.com',
      name: 'Johncito',
      role: 'User',
      enabled: true,
      mfaSecret: '4b4e3f237b363c354134495d7a73213a545243342c74573e5075293c7d62614c',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      organizationId: organizationIds[1],
      attemptsCount: 0
    }])
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
