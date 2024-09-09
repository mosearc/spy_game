const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String
})

module.exports = mongoose.model('Person', personSchema);