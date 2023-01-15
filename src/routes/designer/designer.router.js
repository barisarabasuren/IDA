const express = require('express');
const { authenticateDesignerToken } = require('../../modals/designers/designers.modal');
const { httpAddDesignerQuestionary, httpGetDesignerQuestionary } = require('./designer.controller');

const designerRouter = express.Router();

designerRouter.post('/designer/questionary',authenticateDesignerToken, httpAddDesignerQuestionary);
designerRouter.get('/designer/questionary',authenticateDesignerToken, httpGetDesignerQuestionary);

module.exports = designerRouter;