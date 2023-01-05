const mongoose = require('mongoose');

const designerRateLimit = new mongoose.Schema({
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

const DesignerRateLimit = mongoose.model('DesignerRateLimit', designerRateLimit)

module.exports = DesignerRateLimit