const express = require('express');
const { authenticateClientToken } = require('../../../modals/clients/clients.modal');
const { httpSignUp, httpGetToken, httpGetAccessToken, httpGetClient } = require('./clientAuth.controller');

const authClientRouter = express.Router();

authClientRouter.post('/signup', httpSignUp);
authClientRouter.post('/token', httpGetToken);
authClientRouter.post('/refresh', httpGetAccessToken)
authClientRouter.get('', authenticateClientToken, httpGetClient)

module.exports = authClientRouter;