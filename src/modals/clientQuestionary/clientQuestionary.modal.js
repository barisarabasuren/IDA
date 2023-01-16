const ClientQuestionary = require("./clientQuestionary.mongo")

const { v1: uuidv1 } = require('uuid');

const addClientQuestionary = async(body, jwtClient) => {
    const doesClientQuestionaryExist = Boolean((await getClientQuestionary(jwtClient))[1].length)

    if(doesClientQuestionaryExist) {
        return ([400, "Client questionary exists"])
    }

    const questionary_id = uuidv1();

    const newClientQuestionary = new ClientQuestionary({
        client_id: jwtClient.client_id,
        questionary_id: questionary_id,
        place: body.place,
        jobCategory: body.jobCategory,
        area: body.area,
        impression: body.impression,
        budget: body.budget,
        start: body.start,
        contact: body.contact
    })

    try {
        await newClientQuestionary.save()
        return ([201, 'Created'])
    } catch(err) {
        const errorFields = Object.keys(err.errors)
        return ([400, {typeError: errorFields}])
    }
}

const getClientQuestionary = async(jwtClient) => {
    const clientQuestionaries = await ClientQuestionary.find({
        client_id: jwtClient.client_id
    }, {
        _id: 0, __v: 0
    })

    return([200, clientQuestionaries])
}

module.exports = {
    addClientQuestionary,
    getClientQuestionary
}