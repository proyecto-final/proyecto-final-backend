const {Router} = require('express')
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

const checkLogs = (fileOrFiles, metadata) => {
  if(fileOrFiles?.length === 0 || !fileOrFiles) {
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
  return files.map((file,index) => ({file, metadata: metadatas[index]}))
}

const convertFile = async(req, resp) => {
    const fileOrFiles = req.files?.files
    const {projectId} = req.params
    fileValidated = checkLogs(fileOrFiles, req.body.metadata)
    const file2send = await Promise.all(fileValidated.map(async({file, metadata}) => {
        const fileName = `./temp/project-${projectId}-${file.name}`
        file.mv(fileName)
        if(file.name.endsWith('.evtx')){
            await runCommand(`EvtxECmd.exe -f ${fileName} --csv ./temp --csvf ${fileName}.csv`)
        }
        return {filename:`${fileName}.csv`, metadata}
    }));
    const url = 'http://localhost:3032/api/project/1/correlate/log';
    const formData = new FormData();
     file2send.forEach(async({filename}) => {
        formData.append('files', fs.createReadStream(filename),filename)
    })
    formData.append('metadata',JSON.stringify(fileValidated.map(({metadata}) => metadata)))
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData,config).then(response => {
        resp.status(200).json(response.data)
    }).catch((err)=> {
        console.log(err)
        resp.status(err.status).json({msg: err})

    })
}


//NOTA: cuando lo vayan a usar este projectId recuerden que viene adentro de req.params como {projectId: value}
router.post('/project/:projectId/correlate/log', convertFile)

module.exports = router