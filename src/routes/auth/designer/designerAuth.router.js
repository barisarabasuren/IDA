const express = require('express');
const { rateLimitController } = require('../../../modals/designerRateLimits/designerRateLimits.modal');
const { httpSignUp, httpGetToken, httpGetAccessToken } = require('./designerAuth.controller');

const authDesignerRouter = express.Router();

authDesignerRouter.post('/signup', httpSignUp);
authDesignerRouter.post('/token', rateLimitController, httpGetToken);
authDesignerRouter.post('/refresh', httpGetAccessToken)

module.exports = authDesignerRouter;