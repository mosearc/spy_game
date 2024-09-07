const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: {type: String, required: true},
    code: {type: Number, required: true}
})

module.exports = mongoose.model('Email', emailSchema);