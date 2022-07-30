
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Timeline = Schema({
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
    log: {
      type: Schema.Types.ObjectId,
      ref: 'log'
    },
    lines: [{
      type: Schema.Types.ObjectId,
      ref: 'timelineLine'
    }]
  },
  {
    timestamps: true
  })
  return model('timeline', Timeline)
}