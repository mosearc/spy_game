const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String
})

module.exports = mongoose.model('Word', wordSchema);