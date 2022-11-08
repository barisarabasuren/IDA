const { signUp, getToken, getAccessToken, getClient } = require('../../../modals/clients/clients.modal');

const httpSignUp = async (req,res) => {
    const response = await signUp(req.body)
    return res.status(response[0]).json(response[1])
}

const httpGetToken = async (req,res) => {
    const response = await getToken(req.body)
    return res.status(response[0]).json(response[1])
}

const httpGetAccessToken = async (req, res) => {
    const response = await getAccessToken(req.body)
    return res.status(response[0]).json(response[1])
}

const httpGetClient = async(req, res) => {
    const client_id = req.jwtClient.client_id
    const response = await getClient(client_id)
    return res.status(response[0]).json(response[1])
}

module.exports = {
    httpSignUp,
    httpGetToken,
    httpGetAccessToken,
    httpGetClient
}