const Project = require('../models').project
const User = require('../models').user
const { Op } = require('sequelize')
const ControllerHandler = require('./utils/requestWrapper')
const sequelize = require('sequelize')
const {getIntValue} = require('../controllers/utils/dataHelpers')
const { param } = require('express-validator')

// QUERIES
const findAllBy = (searchQuery, offset, limit) =>{
  return Project.findAll({
    offset,
    limit,
    where: {
      [Op.and]: searchQuery
    },
    attributes: {
      include: [
        [sequelize.fn('COUNT', sequelize.col('users.id')), 'userCount']
      ]
    },
    include: [{
      model: User,
      attributes: [],
      duplicating: false,
      through: {attributes: []}
    }],
    group: ['project.id']
  })
}

const get = new ControllerHandler(
  param('organizationId', 'El id debe ser un numero valido').isNumeric()
).handlePagination()
  .setHandler(async(req, resp) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const name = query.name || ''
    const searchQuery = []
    if (name) {
      searchQuery.push({
        name: {
          [Op.like]: `%${name}%`
        }
      })
    }
    const projects = await findAllBy(searchQuery, offset, limit)
    const count = await Project.count({
      where: {
        [Op.and]: searchQuery
      }
    })
    resp.status(200).json({ rows: projects, count })
  }).wrap()


module.exports = {get}
