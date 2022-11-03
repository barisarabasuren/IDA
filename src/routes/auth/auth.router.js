const express = require('express');
const { authenticateClientToken } = require('../../modals/clients/clients.modal');
const { httpSignUp, httpGetToken, httpGetAccessToken, httpGetClient } = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/auth/client/signup', httpSignUp);
authRouter.post('/auth/client/token', httpGetToken);
authRouter.post('/auth/client/refresh', httpGetAccessToken)
authRouter.get('/auth/client', authenticateClientToken, httpGetClient)

module.exports = authRouter;