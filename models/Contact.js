const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);