
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
    logs: [{
      type: Schema.Types.ObjectId,
      ref: 'log'
    }],
    accessToken: {
      type: String,
      default: null
    },
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
      ip: {
        type: Object,
        default: null
      },
      tags: {
        type: Array,
        default: () => []
      },
      vulnerabilites:  [ {
        type: Schema.Types.ObjectId,
        ref: 'vulnerability'
      }],
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