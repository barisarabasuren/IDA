const express = require('express');
const { authenticateClientToken } = require('../../modals/clients/clients.modal');
const { authenticateDesignerToken } = require('../../modals/designers/designers.modal');
const { httpAddDesignerQuestionary, httpGetDesignerQuestionary, httpGetMatchingDesigners } = require('./designer.controller');

const designerRouter = express.Router();

designerRouter.post('/designer/questionary',authenticateDesignerToken, httpAddDesignerQuestionary);
designerRouter.get('/designer/questionary',authenticateDesignerToken, httpGetDesignerQuestionary);
designerRouter.get('/designer/designers',authenticateClientToken, httpGetMatchingDesigners);

module.exports = designerRouter;