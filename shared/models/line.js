
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
    isSelected: {
      type: Boolean,
      default: false
    },
    raw: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: null,
      required: false
    },
    notes: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      required: true
    },
    ip: {
        raw: {
        type: String,
        required: false
      },
      reputation: {
        type: Number,
        required: false
      },
      isTor:{
        type: Boolean,
        required: false
      },
      country: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      ASN: {
        type: String,
        required: false
      },
      ISP: {
        type: String,
        required: false
      },
      VPN: {
        type: Boolean,
        default: false
      },
      createdAt:{
        type: Date,
        default: Date.now
        },
      updatedAt:{
        type: Date,
        default: Date.now
        },
    }
  })
  Line.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.line || model('line', Line)
}