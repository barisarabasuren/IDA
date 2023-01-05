const mongoose = require('mongoose');

const clientRateLimit = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        required: true,
        default: 1
    },
    createdAt: { 
        type: Date, 
        expires: '5m', 
        default: Date.now 
    }
},)

const ClientRateLimit = mongoose.model('ClientRateLimit', clientRateLimit)

module.exports = ClientRateLimit