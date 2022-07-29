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
  const fileOrFiles = req.files?.files
  const { projectId } = req.params
  const formData = new FormData();
  fileValidated = checkLogs(fileOrFiles, req.body.metadata)
  const file2send = await Promise.all(fileValidated.map(async ({ file, metadata }) => {
    const fileName = `./temp/project-${projectId}-${file.name}`
    file.mv(fileName)
    let convertedName;
    if (file.name.endsWith('.evtx')) {
      if (process.env.PLATFORM === 'linux') {
        convertedName = `./temp/${fileName}-converted.json`
        await runCommand(`evtx_dump -o jsonl -f ${convertedName}  ${fileName}`)
      } else {
        convertedName = `./temp/${fileName}-converted.csv`
        await runCommand(`EvtxECmd.exe -f ${fileName} --csv . --csvf ${convertedName}`)
      }
      //TODO agregar en caso de estar en mac
    }
    return { filename: convertedName, metadata }
  }));
  try {
    fileValidated.forEach(({ file }) => {
      const fileName = `./temp/project-${projectId}-${file.name}`;
      formData.append('files', fs.createReadStream(fileName), fileName)
    })
    const url = `${process.env.HOST_CORRELATION}${req.path}`;
    file2send.forEach(async ({ filename }) => {
      formData.append('filesConverter', fs.createReadStream(filename), filename)
    })
    formData.append('metadata', JSON.stringify(fileValidated.map(({ metadata }) => metadata)))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(url, formData, config).then(response => {
      return resp.status(200).json(response.data)
    }).catch((err) => {
      console.log('axios error',err)
      return resp.status(err?.status || err?.response?.status || 500).json({ msg: err || 'Server error' })
    }).finally(() => {
        console.log('delete files')
        fileValidated.forEach(({ file }) => fs.rmSync(`./temp/project-${projectId}-${file.name}`))
        file2send.forEach(({ filename }) => fs.rmSync(filename))
    })
  } catch (err) {
    console.log('express error',err)
    return resp.status(500).json({ msg: err || 'Internal Server Error' })
  }
}

router.post('/project/:projectId/correlate/log', convertFile)

module.exports = router