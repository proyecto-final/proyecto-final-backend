
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Line = Schema({
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
    vulnerabilites: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Object,
      required: true
    },
    raw: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  })
  return model('line', Line)
}