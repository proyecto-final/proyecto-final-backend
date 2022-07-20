const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { param } = require('express-validator')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)

const create = new RequestWrapper(
  param('projectId', 'El id debe ser un numero valido').isNumeric()
).setHandler(async(req, resp) => {
  const fileOrFiles = req.files?.files
  if(fileOrFiles?.length === 0 || !fileOrFiles) {
    throw { code: 400, msg: 'No files were uploaded.' }
  }
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
  if (files.length > 5) {
    throw { code: 400, msg: 'Max 5 files are allowed.' }
  }
  let metadatas
  try {
    metadatas = JSON.parse(req.body.metadata)
  } catch (err) {
    throw { code: 400, msg: 'Invalid metadata, must be a valid JSON' }
  }
  // const logWithMetadata = files.map((file, index) => ({log :file, ...metadatas[index], projectId: getIntValue(req.params.projectId)}))
  // console.log(logWithMetadata)
  const logs = metadatas.map(logMetadata => new Log({...logMetadata, projectId: getIntValue(req.params.projectId)}))
  await Log.collection.insertMany(logs)
  resp.status(200).json(logs)
}).wrap()

module.exports = { create }