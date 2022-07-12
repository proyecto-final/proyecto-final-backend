const Organization = require('../models').organization
const Project = require('../models').project
const User = require('../models').user
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const ControllerHandler = require('../controllers/utils/requestWrapper')
const {getBooleanValue, getIntValue} = require('../controllers/utils/dataHelpers')
const {checkColor} = require('../controllers/utils/rules')

// QUERIES
const findAllBy = (searchQuery, offset, limit) =>{
  return Organization.findAll({
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
      duplicating: false
    }],
    group: ['id']
  })
}

const findOneBy = (searchWhere) =>{
  return Organization.findOne({
    where: searchWhere,
    attributes: {
      include: [
        [sequelize.fn('COUNT', sequelize.col('users.id')), 'userCount']
      ]
    },
    include: [{
      model: User,
      attributes: [],
      duplicating: false
    }],
    group: ['id']
  })
}

const getUsers = new ControllerHandler()
  .handlePagination()
  .hasId('organizationId')
  .setHandler(async(req, resp) => {
    const { query } = req
    const { organizationId } = req.params
    const offset = getIntValue(query.offset) || 0
    const limit = getIntValue(query.limit) || 10
    const name = query.name || ''
    const enabled = getBooleanValue(query.enabled)
    const searchQuery = [{
      organizationId
    }]
    if (name !== null) {
      searchQuery.push({
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${name}%`
            }
          },
          {
            name: {
              [Op.like]: `%${name}%`
            }
          },
          {
            email: {
              [Op.like]: `%${name}%`
            }
          }]
      })
    }
    if (enabled !== null) {
      searchQuery.push({
        enabled: enabled
      })
    }
    const users = await User.findAndCountAll({
      offset,
      limit,
      where: {
        [Op.and]: searchQuery,
      },
      include: [{
        model: Project,
        attributes: ['id','name', 'prefix', 'color'],
        through: {
          attributes: []
        }
      }]
    })
    resp.status(200).json(users)
  }).wrap()

const getSpecific = new ControllerHandler()
  .hasId('organizationId')
  .setHandler(async(req, resp) => {
    const { organizationId } = req.params
    const organization = await findOneBy({ id: getIntValue(organizationId) })
    if (!organization) {
      throw { code: 404, msg: 'Organization not found' }
    }
    resp.status(200).json(organization)
  }).wrap()

const get = new ControllerHandler()
  .handlePagination()
  .setHandler(async(req, resp) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const name = query.name || ''
    const enabled = getBooleanValue(query.enabled)
    const searchQuery = []
    if (name) {
      searchQuery.push({
        name: {
          [Op.like]: `%${name}%`
        }
      })
    }
    if (enabled !== null) {
      searchQuery.push({
        enabled: enabled
      })
    }
    const organizations = await findAllBy(searchQuery, offset, limit)
    const count = await Organization.count({
      where: {
        [Op.and]: searchQuery
      }
    })
    resp.status(200).json({ rows: organizations, count })
  }).wrap()

const create = new ControllerHandler()
  .setHandler(async(req, resp) => {
    const {name} = req.body
    const color =   req.body.color || undefined
    checkColor(color)
    const createdOrganization = await Organization.create({ name, color })
    resp.status(200).json(createdOrganization)
  }).wrap()

const update = new ControllerHandler().hasId('organizationId').setHandler(async(req, resp) => {
  const { organizationId } = req.params
  const { enabled, name, color }=  req.body
  const organization = await Organization.findOne({
    where: { id: organizationId }
  })
  if (!organization) {
    throw { code: 404, msg: 'Organization not found' }
  }
  let data2Update = {}
  if (enabled !== null) {
    data2Update.enabled = enabled
  }
  if (name !== null) {
    data2Update.name = name
  }
  if (color) {
    checkColor(color)
    data2Update.color = color
  }
  if (Object.keys(data2Update).length === 0) {
    throw { code: 400, msg: 'No data to update' }
  }
  await organization.update(data2Update)
  resp.status(200).json(organization)
}).wrap()

const updateUser = new ControllerHandler().hasId('organizationId').hasId('userId').setHandler(async(req, resp) => {
    const { organizationId, userId} = req.params
    const { enabled, role } = req.body
    const user = await User.findOne({where: { id: userId, organizationId }})
    if (!user) {
      throw { code: 400, msg: 'El usuario no existe o no está asociado a esta organización' }
    }
    let data2Update = {}
    if (enabled !== null) {
      data2Update.enabled = enabled
    }
    if(role) {
      data2Update.role = role 
    }
    await user.update(data2Update)
    resp.status(200).json(user)
}).wrap()


module.exports = {get, update, create, getSpecific, getUsers, updateUser}
