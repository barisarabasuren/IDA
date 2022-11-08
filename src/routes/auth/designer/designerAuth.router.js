const express = require('express');
const { httpSignUp, httpGetToken, httpGetAccessToken } = require('./designerAuth.controller');

const authDesignerRouter = express.Router();

authDesignerRouter.post('/signup', httpSignUp);
authDesignerRouter.post('/token', httpGetToken);
authDesignerRouter.post('/refresh', httpGetAccessToken)

module.exports = authDesignerRouter;