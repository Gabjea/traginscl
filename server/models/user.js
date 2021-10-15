const mongoose = require('../database/index')

const UserSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User', UserSchema)