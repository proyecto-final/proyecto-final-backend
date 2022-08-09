
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Line = Schema({
    log: {
      type: Schema.Types.ObjectId,
      ref: 'log'
    },
    vulnerabilites:  [{
      type: Schema.Types.ObjectId,
      ref: 'vulnerability'
    }],
    detail: {
      type: Object,
      required: true
    },
    raw: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    notes: {
      type: Array,
      default: () => []
    }
  })
  Line.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.line || model('line', Line)
}