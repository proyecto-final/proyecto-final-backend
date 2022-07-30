
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const TimelineLine = Schema({
    detail: {
      type: Object,
      required: true
    },
    raw: {
      type: String,
      required: true
    },
    line: {
      type: Schema.Types.ObjectId,
      ref: 'line'
    }
  })
  return model('timelineLine', TimelineLine)
}