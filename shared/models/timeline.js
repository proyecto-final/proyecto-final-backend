
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Timeline = Schema({
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
    accessToken: {
      type: String,
      default: null
    },
    logs: [{
      type: Schema.Types.ObjectId,
      ref: 'log'
    }],
    lines: [{
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
      }
    }]
  },
  {
    timestamps: true
  })
  Timeline.methods.toJSON = function () {
    const {__v, accessToken, ...others} = this.toObject()
    return others
  }
  return model('timeline', Timeline)
}