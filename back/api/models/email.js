const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: {type: String, required: true, unique: true},
})

module.exports = mongoose.model('Email', emailSchema);