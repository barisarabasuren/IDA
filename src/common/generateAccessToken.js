const jwt = require('jsonwebtoken');
require('dotenv')?.config();

const generateAccessToken = (jwtUser) => {
    return jwt.sign(
        jwtUser, 
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        }
    )
}

module.exports = {
    generateAccessToken
}