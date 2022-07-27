async function processLog (log) {
  // 1 Write
  console.log(log)
  const temporaryName = `${log.log._id.toString()}-${log.file.name}`
  await log.file.mv(`${__dirname}/input/${temporaryName}`, function(err) {
    throw { code: 500, msg: 'Error moving file'+err }
  })
// 2 Process
// 3 Read output
}
module.exports = {
  processFiles: async function(logs) {
    return Promise.all(logs.map(async log => await processLog(log)))
  }
}

