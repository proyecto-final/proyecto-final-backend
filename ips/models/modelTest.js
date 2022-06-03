const { Schema, model } = require('mongoose');

const ModelTestSchema = Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
    
})

module.exports = model('modelTest', ModelTestSchema)