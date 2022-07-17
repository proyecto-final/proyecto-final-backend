// const Log = require('../shared/models/log')


const create = async(req, resp) => {
  console.log(req.files)
  if(!req.files) {
    resp.status(200).json({ msg: 'ERROR' })
  } else {
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let files = req.files
    console.log(files)
  }
  // const model = new Log({name: 'name'})
  // await model.save()
  resp.status(200).send('ok')
}

module.exports = { create }