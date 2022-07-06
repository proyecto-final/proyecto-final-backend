const Organization = require('../models').organization
const User = require('../models').user
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const errorMsg = {
  not_unique: (field) => `El campo '${field}' debe ser unico`,
  is_null:  (field) => `El campo '${field}' debe tener datos`
  //TODO add more validatorKey from sequelize
} 
const handleError = (error) => {
  if (error?.code === 400) {
    //CUSTOM ERROR HANDLING
    return { code: 400, msg: [error.msg] }
  }
  if (error?.errors){
    //DATABASE ERROR HANDLING
    return { code: 400, msg: error.errors.map(error => errorMsg[error.validatorKey](error.path) || error.message)}
  }
  //DEFAULT ERROR HANDLING
  return { code: 500, msg: ['Internal server error'] }
}

const getBooleanValue = (value) => {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return null
}

const getIntValue = (value) => {
  try {
    return parseInt(value)
  } catch {
    return null
  }
}

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

const findOneBy = (searchQuery) =>{
  return Organization.findOne({
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

const getSpecific = async(req, resp) => {
  try {
    const { organizationId } = req.params
    const organization = await findOneBy({
      where: organizationId
    })
    if (!organization) {
      throw { code: 404, msg: 'Organization not found' }
    }
    resp.status(200).json(organization)
  } catch (err) {
    resp.status(500).json({ msg: err.name })
  }
}


const get = async(req, resp) => {
  const { query } = req
  try {
    const offset = getIntValue(query.offset) || 0
    const limit = getIntValue(query.limit) || 10
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
  } catch (err) {
    const { code, msg } = handleError(err)
    resp.status(code).json({ msg })
  }
}

const create = async(req, resp) => {
  try {
    const {name, color} = req.body
    checkColor(color)
    const createdOrganization = await Organization.create({ name, color })
    resp.status(200).json(createdOrganization)
  } catch (err) {
    const { code, msg } = handleError(err)
    resp.status(code).json({ msg })
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
    if (color !== null) {	
      checkColor(color)
      data2Update.color = color
    }
    if (Object.keys(data2Update).length === 0) {
      throw { code: 400, msg: 'No data to update' }
    }
    await organization.update(data2Update)
    resp.status(200).json(organization)
  } catch (err) {
    const {code, msg} = handleError(err)
    resp.status(code).json({ msg })
  }
}


module.exports = {get, update, create, getSpecific}
