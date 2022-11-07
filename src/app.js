const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const authRouter = require('./routes/auth/auth.router');
const clientRouter = require('./routes/client/client.router');

const app = express()

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRouter)
app.use(clientRouter)

module.exports = app;