const { v1: uuidv1 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Designer = require('./designers.mongo');
const { generateAccessToken } = require('../../common/generateAccessToken');
const { generateRefreshToken } = require('../../common/generateRefreshToken');
const { addRefreshToken, doesRefreshTokenExist } = require('../designerRefreshTokens/designerRefreshTokens.modal');
const { addFailedAttempt } = require('../designerRateLimits/designerRateLimits.modal');
const { passwordStrength } = require('check-password-strength');

require('dotenv')?.config();

const config = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}

const signUp = async(body) => {
    const doesDesignerExist = await doesDesignerExistByEmail(body.email)

    if(doesDesignerExist) {
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
        
    const designer_id = uuidv1();

    const newDesigner = new Designer ({
        designer_id: designer_id,
        name: body.name,
        email: body.email,
        password: hashedPassword,
        phone: body.phone,
        address: body.address,
        about: body.about,
    })

    try {
        await newDesigner.save()
        return ([201, 'Created'])
    } catch(err) {
        const errorFields = Object.keys(err.errors)
        return ([400, {typeError: errorFields}])
    }
}

const getToken = async(body, ip) => {
    const designer = await Designer.findOne(
        {email: body.email},
        {designer_id: 1, password: 1, _id: 0}
    )

    if(!designer) {
        return ([400, 'Email has not registered'])
    }

    const doesPasswordMatch = await bcrypt.compare(body.password, designer.password)

    if(!doesPasswordMatch) {
        await addFailedAttempt(ip)
        return ([400, 'Wrong password'])
    }

    try {
        const jwtDesigner = {
            designer_id: designer.designer_id
        }

        const accessToken = generateAccessToken(jwtDesigner)
        const refreshToken = generateRefreshToken(jwtDesigner)

        addRefreshToken(refreshToken)

        return ([200, {accessToken: accessToken, refreshToken: refreshToken}])
    } catch(err) {
        return ([500, 'Something went wrong'])
    }
}

const getAccessToken = async(body) => {
    const refreshToken = body.refreshToken;

    if(!( await doesRefreshTokenExist(refreshToken))){
        return ([403, 'Refresh token does not exist on the database']);
    } 

    const response = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, jwtDesigner) => {
        if(err) {
            return ([500, 'Something went wrong'])
        }
        const accessToken = generateAccessToken({designer_id: jwtDesigner.designer_id})
        return ([200, {accessToken: accessToken}])
    })

    return response
}

const authenticateDesignerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, jwtDesigner) =>{
        if(err) {
            return res.sendStatus(403);
        }

        req.jwtDesigner = jwtDesigner;
        next();
    })
}

const doesDesignerExistByEmail = async(email) => {
    const response = await Designer.exists({email: email})
    return Boolean(response)
}

module.exports = {
    signUp,
    getToken,
    getAccessToken,
    authenticateDesignerToken
}