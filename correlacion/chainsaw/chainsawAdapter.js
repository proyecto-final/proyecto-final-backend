async function processLog (log) {
  // 1 Write
  console.log(log)
// 2 Process
// 3 Read output
}
module.exports = {
  processFiles: async function(logs) {
    return Promise.all(logs.map(async log => await processLog(log)))
  }
}

