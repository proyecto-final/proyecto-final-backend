
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
  isTor:{
    type: Boolean,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  ASN: {
    type: String,
    required: true
  },
  ISP: {
    type: String,
    required: true
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
  })
  Ip.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.ip || model('Ip', Ip)
}