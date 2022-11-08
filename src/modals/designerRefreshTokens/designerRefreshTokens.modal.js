const DesignerRefreshToken = require('./designerRefreshTokens.mongo')

const addRefreshToken = async (refreshToken) => {
    const newRefreshToken = new DesignerRefreshToken({
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
    const response = DesignerRefreshToken.exists({refreshToken: refreshToken})
    return Boolean(await response)
}

module.exports = {
    addRefreshToken,
    doesRefreshTokenExist
}