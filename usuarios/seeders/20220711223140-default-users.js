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
      mfaSecret: '77456e3c4028395e76637a70734c2a47312e567023285d443c5d41554d745e42',
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
      mfaSecret: 'INKHKUJBK4QVIS2IMFNXM42CJBYDGNCOOAZXA422MFSDMOKUPMUA',
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
      mfaSecret: 'JNIWMXKQLU6EI42KKFLVGVCTLJTHI5ROMRDVQ6TQHB3C4L3WIJGQ',
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
      mfaSecret: 'PJCT6USGFZCD6ODIMFPDQZLDNMSXSSKQNNOU4OL2GQ2V253DMZXQ',
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
