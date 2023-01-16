const mongoose = require('mongoose');

const designerRefreshToken = new mongoose.Schema({
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

const DesignerRefreshToken = mongoose.model('DesignerRefreshToken', designerRefreshToken)

module.exports = DesignerRefreshToken