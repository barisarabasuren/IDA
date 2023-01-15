const { v1: uuidv1 } = require('uuid');
const DesignerQuestionary = require("./designerQuestionary.mongo");

const addDesignerQuestionary = async(body, jwtDesigner) => {
    const questionary_id = uuidv1();

    const newDesignerQuestionary = new DesignerQuestionary({
        designer_id: jwtDesigner.designer_id,
        questionary_id: questionary_id,
        workDistrict: body.workDistrict,
        jobCategory: body.jobCategory,
        area: body.area,
        impression: body.impression,
        budget: body.budget,
        start: body.start,
        contact: body.contact
    })

    try {
        await newDesignerQuestionary.save()
        return ([201, 'Created'])
    } catch(err) {
        const errorFields = Object.keys(err.errors)
        return ([400, {typeError: errorFields}])
    }
}

const getDesignerQuestionary = async(jwtDesigner) => {
    const designerQuestionaries = await DesignerQuestionary.find({
        designer_id: jwtDesigner.designer_id
    }, {
        _id: 0, __v: 0
    })

    return([200, designerQuestionaries])
}

module.exports = {
    addDesignerQuestionary,
    getDesignerQuestionary
}