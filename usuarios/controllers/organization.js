const Organization = require('../models').organization
const User = require('../models').user
const { Op } = require('sequelize')
const sequelize = require('sequelize')

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
    const organizations = await Organization.findAll({
      offset,
      limit,
      where: {
        [Op.and]: searchQuery
      },
      order: [
        ['name', 'ASC']
      ],
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
    const count = await Organization.count({
      where: {
        [Op.and]: searchQuery
      }
    })
    resp.status(200).json({ rows: organizations, count })
  } catch (err) {
    console.error(err)
    resp.status(500).json(err.name)
  }
}

const create = async(req, resp) => {
  try {
    const colorRegex = /^#([A-Fa-f0-9]{6})$/g
    const {name, color} = req.body
    if (!colorRegex.test(color)){
      throw {msg: 'invalid color'}
    }
    await Organization.create({ name, color })
    resp.status(200).json({msg: 'OK'})
  } catch (err) {
    console.error(err)
    resp.status(500).json({msg: err.msg})
  }
}

module.exports = {get, create}