const express = require('express');
const { authenticateClientToken } = require('../../modals/clients/clients.modal');
const { httpAddClientQuestionary, httpGetClientQuestionary } = require('./client.controller');

const clientRouter = express.Router();

clientRouter.post('/client/questionary',authenticateClientToken, httpAddClientQuestionary);
clientRouter.get('/client/questionary',authenticateClientToken, httpGetClientQuestionary);

module.exports = clientRouter;