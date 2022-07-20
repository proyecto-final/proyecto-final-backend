
module.exports = mongoose => {
  const { Schema, model } = mongoose
  const Log = Schema ({
    name: {
      type: String,
      required: [true, 'Nombre es requerido']
    },
    title: {
      type: String,
      required: [true, 'El título es requerido']
    },
    description: {
      type: String,
      required: false
    },
    projectId: {
      type: Number,
      required: [true, 'El projectid es requerido']
    }
  })
  return model('log', Log)
}