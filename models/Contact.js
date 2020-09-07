const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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