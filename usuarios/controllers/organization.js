const Organization = require('../models').organization
const User = require('../models').user
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const {handleError} = require('./utils/errors')
const ControllerHandler = require('../controllers/utils/requestWrapper')
const {getBooleanValue, getIntValue} = require('../controllers/utils/dataHelpers')

// VALIDATIONS 
const checkColor = (color) => {
  const colorRegex = /^#([A-Fa-f0-9]{6})$/g
  if (color && !colorRegex.test(color)){
    throw {code: 400, msg: 'Invalid color'}
  }
}

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

const getUsers = async(req, resp) => {
  const { query } = req
  const { organizationId } = req.params
  try {
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
      }
    })
    resp.status(200).json(users)
  }catch (err) {
    handleError(resp,err)

  }
}
const getSpecific = async(req, resp) => {
  try {
    const { organizationId } = req.params
    const organization = await findOneBy({ id: getIntValue(organizationId) })
    if (!organization) {
      throw { code: 404, msg: 'Organization not found' }
    }
    resp.status(200).json(organization)
  } catch (err) {
    handleError(resp,err)
  }
}

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

const create = async(req, resp) => {
  try {
    const {name} = req.body
    const color =   req.body.color || undefined
    checkColor(color)
    const createdOrganization = await Organization.create({ name, color })
    resp.status(200).json(createdOrganization)
  } catch (err) {
    handleError(resp,err)
  }
}

const update = async(req, resp) => {
  try {
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
  } catch (err) {
    handleError(resp,err)
  }
}


module.exports = {get, update, create, getSpecific, getUsers}
