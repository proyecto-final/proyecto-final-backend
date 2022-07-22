
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
    },
    state: {
      type: String,
      required: true,
      enum: ['processing', 'processed'],
      default: 'processing'
    }
  })
  return model('log', Log)
}