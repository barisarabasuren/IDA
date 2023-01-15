const mongoose = require('mongoose');
const { createSchemaFromTypes } = require('../../common/createSchemaFromTypes');
const { jobCategoryTypes, contactTypes, budgetTypes, startTypes, areaTypes, impressionTypes } = require('./clientQuestionary.types');

const jobCategorySchema = new mongoose.Schema(createSchemaFromTypes(jobCategoryTypes))
const contactSchema = new mongoose.Schema(createSchemaFromTypes(contactTypes))

const clientQuestionarySchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true
    },
    questionary_id: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    jobCategory: {
        type: jobCategorySchema,
        required: true
    },
    area: {
        type: String,
        required: true,
        enum: areaTypes
    },
    impression: {
        type: String,
        required: true,
        enum: impressionTypes
    },
    budget: {
        type: String,
        required: true,
        enum: budgetTypes
    },
    start: {
        type: String,
        required: true,
        enum: startTypes
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


const ClientQuestionary = mongoose.model('ClientQuestionary', clientQuestionarySchema)

module.exports = ClientQuestionary