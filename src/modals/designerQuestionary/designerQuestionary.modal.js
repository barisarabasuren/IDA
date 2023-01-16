const { v1: uuidv1 } = require('uuid');
const DesignerQuestionary = require("./designerQuestionary.mongo");
const { jobCategoryTypes, contactTypes } = require('./designerQuestionary.types');

const addDesignerQuestionary = async(body, jwtDesigner) => {
    const doesDesignerQuestionaryExist = Boolean((await getDesignerQuestionary(jwtDesigner))[1].length)

    if(doesDesignerQuestionaryExist) {
        return ([400, "Designer questionary exists"])
    }
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

const getMatchingQuestionaries = async(clientQuestionary) => {
    const queryObj = {
        [`area.${clientQuestionary.area}`]: true,
        [`impression.${clientQuestionary.impression}`]: true,
        [`budget.${clientQuestionary.budget}`]: true,
        [`start.${clientQuestionary.start}`]: true,
        $or: [
            
        ]
    }

    const jobCategory = clientQuestionary.jobCategory
    for(let i = 0; i < jobCategoryTypes.length; i++) {
        if(jobCategory[jobCategoryTypes[i]] === true) {
            queryObj[`jobCategory.${jobCategoryTypes[i]}`]= true
        }
    }

    const contact = clientQuestionary.contact
    for(let i = 0; i < contactTypes.length; i++) {
        if(contact[contactTypes[i]] === true) {
            queryObj.$or.push({
                [`contact.${contactTypes[i]}`]: true
            })
        }
    }

    const matchingQuestionaries = await DesignerQuestionary.find(queryObj)

    return matchingQuestionaries
}

module.exports = {
    addDesignerQuestionary,
    getDesignerQuestionary,
    getMatchingQuestionaries
}