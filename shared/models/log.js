module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Log = Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 32
    },
    description: {
      type: String,
      required: false,
      maxLength: 250
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
      enum: ['processing', 'processed', 'error'],
      default: 'processing'
    },
    differentEvents: {
      type: Array,
      default: () => [],
    }
  },
  {
    timestamps: true
  })
  Log.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.log || model('log', Log)
}