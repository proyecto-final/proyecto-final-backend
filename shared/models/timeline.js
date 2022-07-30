
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
    log: {
      type: Schema.Types.ObjectId,
      ref: 'log'
    },
    timelineLines: [{
      type: Schema.Types.ObjectId,
      ref: 'timelineLine'
    }]
  },
  {
    timestamps: true
  })
  return model('timeline', Timeline)
}