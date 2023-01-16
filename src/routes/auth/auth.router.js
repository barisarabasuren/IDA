const express = require('express');
const authClientRouter = require('./client/clientAuth.router');
const authDesignerRouter = require('./designer/designerAuth.router');

const authRouter = express.Router();

authRouter.use('/auth/client', authClientRouter)
authRouter.use('/auth/designer', authDesignerRouter)

module.exports = authRouter;