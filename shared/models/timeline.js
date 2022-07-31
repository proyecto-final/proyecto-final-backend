
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Timeline = Schema({
    //que el log pertenezca al project id, las lines son las lineas de log 
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
  Timeline.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return model('timeline', Timeline)
}