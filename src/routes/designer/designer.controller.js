const { addDesignerQuestionary, getDesignerQuestionary } = require('../../modals/designerQuestionary/designerQuestionary.modal');
const { getMatchingDesigners } = require('../../modals/designers/designers.modal');

const httpAddDesignerQuestionary = async (req,res) => {
    const body = req.body;
    const jwtDesigner = req.jwtDesigner
    const response = await addDesignerQuestionary(body, jwtDesigner)
    return res.status(response[0]).json(response[1])
}

const httpGetDesignerQuestionary = async (req, res) => {
    const jwtDesigner = req.jwtDesigner
    const response = await getDesignerQuestionary(jwtDesigner)
    return res.status(response[0]).json(response[1])
}

const httpGetMatchingDesigners = async (req, res) => {
    const jwtClient = req.jwtClient
    const response = await getMatchingDesigners(jwtClient)
    return res.status(response[0]).json(response[1])
}

module.exports = {
    httpAddDesignerQuestionary,
    httpGetDesignerQuestionary,
    httpGetMatchingDesigners
}