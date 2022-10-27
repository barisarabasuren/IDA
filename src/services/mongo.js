const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!')
});

mongoose.connection.on('error', (err) => {
    console.error(err)
});

const mongoConnect = () => {
    mongoose.connect(MONGO_URL);
}

const mongoDisconnect = () => {
    mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}