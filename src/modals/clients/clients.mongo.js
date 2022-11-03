const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
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
    }
})


const Client = mongoose.model('Client', clientsSchema)

module.exports = Client