const { addClientQuestionary, getClientQuestionary } = require('../../modals/clientQuestionary/clientQuestionary.modal');

const httpAddClientQuestionary = async (req,res) => {
    const body = req.body;
    const jwtClient = req.jwtClient
    const response = await addClientQuestionary(body, jwtClient)
    return res.status(response[0]).json(response[1])
}

const httpGetClientQuestionary = async (req, res) => {
    const jwtClient = req.jwtClient
    const response = await getClientQuestionary(jwtClient)
    return res.status(response[0]).json(response[1])
}

module.exports = {
    httpAddClientQuestionary,
    httpGetClientQuestionary
}