const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = 8000;

const server = http.createServer(app);

const startServer = () => {
    mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
    })
};

startServer();