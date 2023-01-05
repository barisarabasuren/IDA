const { signUp, getToken, getAccessToken } = require("../../../modals/designers/designers.modal")

const httpSignUp = async (req,res) => {
    const response = await signUp(req.body)
    return res.status(response[0]).json(response[1])
}

const httpGetToken = async (req,res) => {
    const response = await getToken(req.body, req.ip)
    return res.status(response[0]).json(response[1])
}

const httpGetAccessToken = async (req, res) => {
    const response = await getAccessToken(req.body)
    return res.status(response[0]).json(response[1])
}

module.exports = {
    httpSignUp,
    httpGetToken,
    httpGetAccessToken
}