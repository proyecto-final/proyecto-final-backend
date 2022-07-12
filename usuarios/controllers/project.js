const Project = require('../models').project
const User = require('../models').user
const { Op } = require('sequelize')
const ControllerHandler = require('./utils/requestWrapper')
const sequelize = require('sequelize')
const {getIntValue} = require('../controllers/utils/dataHelpers')
const { param } = require('express-validator')
const {checkColor} = require('../controllers/utils/rules')

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
    const { organizationId } = req.params
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const name = query.name || ''
    const searchQuery = [
      {
        organizationId
      }
    ]
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

const create = new ControllerHandler(
  param('organizationId', 'El id debe ser un numero valido').isNumeric()
).setHandler(async(req, resp) => {
  const { organizationId } = req.params
  const project = req.body
  const color =   req.body.color || undefined
  checkColor(color)
  const createdProject = await Project.create({ ...project, color, organizationId })
  resp.status(200).json(createdProject)
}).wrap()

const update = new ControllerHandler(
  param('organizationId', 'El id debe ser un numero valido').isNumeric(),
  param('projectId', 'El id debe ser un numero valido').isNumeric()
).setHandler(async(req, resp) => {
  const { organizationId, projectId } = req.params
  const project = req.body
  const existingProject = await Project.findOne({id: projectId, organizationId})
  let data2Update = {}
  if (project.name) {
    data2Update.name = project.name
  }
  if (project.color) {
    checkColor(project.color)
    data2Update.color = project.color
  }
  if (project.prefix) {
    data2Update.prefix = project.prefix
  }
  await existingProject.update(data2Update)
  resp.status(200).json(existingProject)
}).wrap()

module.exports = { get, create, update}
