const mongoose = require('mongoose');
const { createSchemaFromTypes } = require('../../common/createSchemaFromTypes');
const { jobCategoryTypes, contactTypes, budgetTypes, startTypes, areaTypes, impressionTypes, workDistrictTypes } = require('./designerQuestionary.types');

const workDistrictSchema = new mongoose.Schema(createSchemaFromTypes(workDistrictTypes))
const jobCategorySchema = new mongoose.Schema(createSchemaFromTypes(jobCategoryTypes))
const areaSchema = new mongoose.Schema(createSchemaFromTypes(areaTypes))
const impressionSchema = new mongoose.Schema(createSchemaFromTypes(impressionTypes))
const budgetSchema = new mongoose.Schema(createSchemaFromTypes(budgetTypes))
const startSchema = new mongoose.Schema(createSchemaFromTypes(startTypes))
const contactSchema = new mongoose.Schema(createSchemaFromTypes(contactTypes))

const designerQuestionarySchema = new mongoose.Schema({
    designer_id: {
        type: String,
        required: true
    },
    questionary_id: {
        type: String,
        required: true
    },
    workDistrict:{
        type: workDistrictSchema,
        required: true
    },
    jobCategory: {
        type: jobCategorySchema,
        required: true
    },
    area: {
        type: areaSchema,
        required: true,
    },
    impression: {
        type: impressionSchema,
        required: true
    },
    budget: {
        type: budgetSchema,
        required: true
    },
    start: {
        type: startSchema,
        required: true
    },
    contact: {
        type: contactSchema,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})


const DesignerQuestionary = mongoose.model('DesignerQuestionary', designerQuestionarySchema)

module.exports = DesignerQuestionary