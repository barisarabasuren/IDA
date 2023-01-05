const { v1: uuidv1 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { findMissingCredentials } = require("../../common/findMissingCredentials");
const { addRefreshToken, doesRefreshTokenExist } = require('../clientRefreshTokens/clientRefreshTokens.modal');

require('dotenv')?.config();

const Client = require('./clients.mongo');
const { generateAccessToken } = require('../../common/generateAccessToken');
const { generateRefreshToken } = require('../../common/generateRefreshToken');
const { addFailedAttempt } = require('../clientRateLimits/clientRateLimits.modal');
const { passwordStrength } = require('check-password-strength');

const config = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}

const signUp = async(body) => {
    const requiredFields = [
        'name',
        'surname',
        'email',
        'password'
    ]
    
    const missingCredentials = findMissingCredentials(body, requiredFields)
    
    if(missingCredentials.length) {
        return ([400, {missingCredentials: missingCredentials}])
    }

    const doesClientExist = await doesClientExistByEmail(body.email)

    if(doesClientExist) {
        return ([400, 'This email is already registered'])
    }

    const passwordCheck = passwordStrength(body.password)
    
    if(passwordCheck.value !== "Strong") {
        return([400, passwordCheck])
    }

    const hashedPassword = (
        body.password?
        await bcrypt.hash(body.password, 10):
        null
    );
        
    const client_id = uuidv1();

    const newClient = new Client ({
        client_id: client_id,
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: hashedPassword
    })

    try {
        await newClient.save()
        return ([201, 'Created'])
    } catch(err) {
        const errorFields = Object.keys(err.errors)
        return ([400, {typeError: errorFields}])
    }
}

const getToken = async(body, ip) => {
    const requiredFields = [
        'email',
        'password'
    ]
    
    const missingCredentials = findMissingCredentials(body, requiredFields)
    
    if(missingCredentials.length) {
        return ([400, {missingCredentials: missingCredentials}])
    }

    const client = await Client.findOne(
        {email: body.email},
        {client_id: 1, password: 1, _id: 0}
    )

    if(!client) {
        return ([400, 'Email has not registered'])
    }

    const doesPasswordMatch = await bcrypt.compare(body.password, client.password)

    if(!doesPasswordMatch) {
        await addFailedAttempt(ip)
        return ([400, 'Wrong password'])
    }

    try {
        const jwtClient = {
            client_id: client.client_id
        }

        const accessToken = generateAccessToken(jwtClient)
        const refreshToken = generateRefreshToken(jwtClient)

        addRefreshToken(refreshToken)

        return ([200, {accessToken: accessToken, refreshToken: refreshToken}])
    } catch(err) {
        return ([500, 'Something went wrong'])
    }
}

const getAccessToken = async(body) => {
    const requiredFields = [
        'refreshToken'
    ]
    
    const missingCredentials = findMissingCredentials(body, requiredFields)
    
    if(missingCredentials.length) {
        return ([400, {missingCredentials: missingCredentials}])
    }
    const refreshToken = body.refreshToken;

    if(!( await doesRefreshTokenExist(refreshToken))){
        return ([403, 'Refresh token does not exist on the database']);
    } 

    const response = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, jwtClient) => {
        if(err) {
            return ([500, 'Something went wrong'])
        }
        const accessToken = generateAccessToken({client_id: jwtClient.client_id})
        return ([200, {accessToken: accessToken}])
    })

    return response
}

const getClient = async(client_id) => {
    const response = await Client.findOne({
        client_id: client_id
    }, {
        _id: 0, name: 1, surname: 1, email: 1
    })
    return ([200, response])
}

const authenticateClientToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, jwtClient) =>{
        if(err) {
            return res.sendStatus(403);
        }

        req.jwtClient = jwtClient;
        next();
    })
}

const doesClientExistByEmail = async(email) => {
    const response = await Client.exists({email: email})
    return Boolean(response)
}

module.exports = {
    signUp,
    getToken,
    getAccessToken,
    getClient,
    authenticateClientToken
}