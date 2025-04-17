const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    code: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200 // Auto-delete after 0.5 day (in seconds)
    }
});

module.exports = mongoose.model('Email', emailSchema);
