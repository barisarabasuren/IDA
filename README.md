# Interior Designer Application (HOMY)

This repository contains **backend** of HOMY, which provides the API to manage designer and client actions([Deployed on AWS](http://18.159.34.94:8000/))

This document aims to give an overview about the techstack and API documentation. In addition, the reader gets to know how to install and setup a local development environment.

For collaboration guidelines, please check the [repository wiki](https://github.com/barisarabasuren/IDA/wiki/How-to-Collaborate).

# CI / CD
The CI/CD-workflow for the project components is located in [`.github/workflows/`](.github/workflows/) under their respective names.

The CI/CD pipeline diagram is located in [repository wiki](https://github.com/barisarabasuren/IDA/wiki/Continuous-Integration-and-Delivery).

# Cyber Security
The [notion page](https://www.notion.so/Security-Preventive-Measures-b8e44c8c14d540eeb4444733890e403b) includes the relevant documents for SE_09 Cyber Security module. 


# High-Level Overview
![Overview](./overview.jpeg?raw=true)

# Techstack
We build the entire backend of Homy with the following technologies:
- [node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)

Additional libraries:
- [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [swagger](https://www.npmjs.com/package/swagger-jsdoc)
- [uuid](https://github.com/uuidjs/uuid/)
- [dotenv](https://www.npmjs.com/package/dotenv)

For developing and testing:
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)

# Code Structure
The backend consists of:
- `src`:
    - `common`: Functions that are usefull to the whole project
    - `modals`: Models related to the whole project
    - `routes`: Routers and controllers related to the whole endpoints
    - `services`: Definition of external services such as mongoDB
    - `app.js`: Definition of the application
    - `server.js`: Definition and start of the server
- `.nvmrc`: Declaration of NVM(Node Version Manager)
- `Dockerfile`: Instructions for building a docker image of the source code
- `package-lock.json`:
- `package.json`:
- `swagger.json`: Description of API documentation

# API Documentation
For SwaggerUI API documentation, please check [here](http://18.159.34.94:8000/docs/).

### Installation
Requirements:
- [node.js](https://nodejs.org/en/)

To run the backend service you have to clone the repository:
```zsh
git clone https://github.com/barisarabasuren/IDA.git
cd ./IDA
```
Switch to the right npm version and instal packages.
```zsh
nvm use
npm install
```

Start the server
```zsh
npm start
```

- Note that in order to start the server you need to create .env file. You should create it in the [`root folder`](/) and define the necessary variables. For example:
```
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MONGO_URL=mongodb+srv://<username>:<password>@<cluster_name>/?retryWrites=true&w=majority
```
- For MONGO_URL you should edit the fields in angle brackets with your mongo credentials