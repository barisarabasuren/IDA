const ClientRefreshToken = require('./clientRefreshTokens.mongo')

const addRefreshToken = async (refreshToken) => {
    const newRefreshToken = new ClientRefreshToken({
        refreshToken: refreshToken
    })
    try {
        await newRefreshToken.save()
        return('Success')
    }
    catch {
        return('Something went wrong')
    }
}

const doesRefreshTokenExist = async (refreshToken) => {
    const response = ClientRefreshToken.exists({refreshToken: refreshToken})
    return Boolean(await response)
}

module.exports = {
    addRefreshToken,
    doesRefreshTokenExist
}