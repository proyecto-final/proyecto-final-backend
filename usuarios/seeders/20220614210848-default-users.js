module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('users', [{
      username: 'pepe',
      password: '7c9e7c1494b2684ab7c19d6aff737e460fa9e98d5a234da1310c97ddf5691834',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down (queryInterface) {
    return queryInterface.bulkDelete('users', null, {})
  }

}



