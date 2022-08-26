
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Ip = Schema({
    raw: {
      type: String,
      required: true
    },
    reputation: {
      type: Number,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    reports: {
      type: Array,
      default: () => []
    },
    ports: {
      type: Array,
      default: () => []
    },
    isTor:{
      type: Boolean,
      required: true
    },
    totalReports: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    ASN: {
      type: String,
      default: ''
    },
    ISP: {
      type: String,
      default: ''
    },
    VPN: {
      type: Boolean,
      default: false
    },
    lastReportedAt: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true
  })
  Ip.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.ip || model('ip', Ip)
}