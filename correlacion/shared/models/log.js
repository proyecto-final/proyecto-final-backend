const { Schema, model } = require('mongoose')
const Log = Schema ({
  name: {
    type: String,
    required: [true, 'Name is required']
  }
})
module.exports = model('log', Log)