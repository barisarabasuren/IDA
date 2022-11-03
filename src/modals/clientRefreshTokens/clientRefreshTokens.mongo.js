const mongoose = require('mongoose');

const clientRefreshToken = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        expires: '1440m', 
        default: Date.now 
    }
},)

const ClientRefreshToken = mongoose.model('ClientRefreshToken', clientRefreshToken)

module.exports = ClientRefreshToken