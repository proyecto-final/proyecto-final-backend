
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Log = Schema ({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    projectId: {
      type: Number,
      required: true
    },
    extension: {
      type: String,
      required: true,
      enum: ['evtx', 'log']
    }
  })
  return model('log', Log)
}