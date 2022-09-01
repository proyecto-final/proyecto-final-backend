const { Router } = require('express')
const { exec } = require('child_process')
const router = Router()
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs')


const runCommand = (stringCommand) => {
  return new Promise((resolve, reject) => {
    const migrate = exec(
      stringCommand,
      { env: process.env },
      err => (err ? reject(err) : resolve())
    )
    migrate.stdout.pipe(process.stdout)
    migrate.stderr.pipe(process.stderr)
  })
}

//TODO poner en shared
const checkLogs = (fileOrFiles, metadata) => {
  if (fileOrFiles?.length === 0 || !fileOrFiles) {
    throw { code: 400, msg: 'No files were uploaded.' }
  }
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
  if (files.length > 5) {
    throw { code: 400, msg: 'Max 5 files are allowed.' }
  }
  let metadatas
  try {
    metadatas = JSON.parse(metadata)
  } catch (err) {
    throw { code: 400, msg: 'Invalid metadata, must be a valid JSON' }
  }
  if (files.length !== metadatas.length) {
    throw { code: 400, msg: 'Number of files and metadata must be the same' }
  }
  return files.map((file, index) => ({ file, metadata: metadatas[index] }))
}

const convertFile = async (req, resp) => {
  try {
    const fileOrFiles = req.files?.files
    const formData = new FormData()
    fileValidated = checkLogs(fileOrFiles, req.body.metadata)
    // File to string
    const files2send = await Promise.all(fileValidated.map(async ({ file, metadata }) => {
      const random = (Math.random() + 1).toString(36).substring(2)
      const fileNameWithoutParenthesesOrSpaces = file.name.replace(/\(.*?\)|\s+/g,'')
      const inputFileName = `./input/${random}-${fileNameWithoutParenthesesOrSpaces}`
      const convertedName = `./output/${random}-${fileNameWithoutParenthesesOrSpaces}-converted.json`
      await file.mv(inputFileName)
      if (file.name.endsWith('.evtx')) {
        if (process.env.PLATFORM === 'linux') {
          await runCommand(`evtx_dump -o jsonl -f ${convertedName}  ${inputFileName}`)
        } else {
          throw { code: 400, msg: 'Only linux platform is supported' }
        }
        return { input: inputFileName, output: convertedName, metadata }
      }
      return { input: inputFileName, metadata }
    }))
    // Send to server
    const url = `${process.env.HOST_CORRELATION}${req.path}`
    files2send.forEach(({input, output}) => {
      formData.append('files', fs.createReadStream(input), input)
      if (output) {
        formData.append('convertedFiles', fs.createReadStream(output), output)
      }
    })
    formData.append('metadata', JSON.stringify(fileValidated.map(({ metadata }) => metadata)))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(url, formData, config).then(response => {
      resp.status(200).json(response.data)
    }).catch((err) => {
      console.log('axios error',err)
      resp.status(err?.status || err?.response?.status || 500).json({ msg: err?.response?.data?.msg || err || 'Server error' })
    }).finally(() => {
      files2send.forEach(({ input, output }) => {
        fs.unlinkSync(input)
        if(output) {
          fs.unlinkSync(output)
        }
      })
    })

  } catch (err) {
    console.log('express error',err)
    resp.status(500).json({ msg: err || 'Internal Server Error' })
  }

}

router.post('/project/:projectId/correlate/log', convertFile)

module.exports = router