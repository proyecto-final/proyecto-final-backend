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
  if (files.length !== metadatas.length) {
    throw { code: 400, msg: 'Number of files and metadata must be the same' }
  }
  const logsWithMetadata = files.map((file, index) => ({extension :file.name.split('.').pop(), ...metadatas[index], projectId: getIntValue(req.params.projectId)}))
  const logs = logsWithMetadata.map(logMetadata => new Log({...logMetadata, projectId: getIntValue(req.params.projectId)}))
  await Promise.all(logs.map(async log => await log.validate()))
  await Log.collection.insertMany(logs)
  resp.status(200).json(logs)
}).wrap()


const destroy = new RequestWrapper(param('logId').isMongoId()).hasId('projectId')
  .setHandler(async(req, resp) => {
    const { projectId, logId } = req.params
    const deletedLogs = await Log.findOneAndDelete({id: logId, projectId})
    if (deletedLogs === 0){
      throw { code: 404, msg: 'Log not found' }
    }
    resp.status(200).json({ msg: 'OK' })
  }).wrap()


module.exports = { create, destroy }