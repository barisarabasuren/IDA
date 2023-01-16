const mongoose = require('mongoose');

const adressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

const designersSchema = new mongoose.Schema({
    designer_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: adressSchema,
        required: true
    },
    about: {
        type: String,
        required: true
    },
})


const Designer = mongoose.model('Designer', designersSchema)

module.exports = Designer