
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
    timestamp: {
      type: String,
      require: true
    },
    line: {
      type: Schema.Types.ObjectId,
      ref: 'line'
    },
    tags: {
      type: Array,
      default: () => []
    },
    vulnerabilites: {
      type: Array,
      default: () => []
    },
  })
  TimelineLine.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return model('timelineLine', TimelineLine)
}