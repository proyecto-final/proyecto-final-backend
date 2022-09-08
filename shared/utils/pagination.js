const adaptMongoosePage = mongoosePage => ({
  rows: mongoosePage[0]?.paginatedResult || [],
  count: mongoosePage[0]?.totalCount[0]?.totalCount || 0
})

module.exports = { adaptMongoosePage }