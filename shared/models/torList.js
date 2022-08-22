
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const TorList = Schema({
  list: [{
    type: String,
    required: true
  }],
  createdAt:{
    type: Date,
    default: Date.now
    },
   updatedAt:{
    type: Date,
    default: Date.now
    },
  })
  TorList.methods.toJSON = function () {
    const {__v, ...others} = this.toObject()
    return others
  }
  return mongoose.models.torList || model('TorList', TorList)
}