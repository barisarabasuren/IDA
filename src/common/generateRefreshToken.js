const jwt = require('jsonwebtoken');
require('dotenv')?.config();

const generateRefreshToken = (jwtUser) => {
    return jwt.sign(
        jwtUser,
        process.env.REFRESH_TOKEN_SECRET
    )
}

module.exports = {
    generateRefreshToken
}