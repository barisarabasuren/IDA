const mongoose = require('mongoose');
const { jobCategoryTypes, contactTypes, budgetTypes, startTypes } = require('./clientQuestionary.types');

const createBoolSchema = (types) => {
    let schema = {}
    
    for(let i = 0; i < types.length; i++) {
        schema[types[i]] = {
            type: Boolean,
            required: true
        }
    }

    return schema
}

const jobCategorySchema = new mongoose.Schema(createBoolSchema(jobCategoryTypes))

const contactSchema = new mongoose.Schema(createBoolSchema(contactTypes))

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
        type: Number,
        required: true,
    },
    impression: {
        type: String,
        required: true
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