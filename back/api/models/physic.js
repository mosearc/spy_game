const mongoose = require('mongoose');

const physicSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String
})

module.exports = mongoose.model('Physic', physicSchema);