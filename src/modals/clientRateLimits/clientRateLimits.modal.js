const ClientRateLimit = require("./clientRateLimits.mongo")

const findFailedAttempt = async (ip) => {
    const failedAttempt = await ClientRateLimit.findOne({
        ip: ip
    })
    return failedAttempt
}

const addFailedAttempt = async(ip) => {
    try {
        await ClientRateLimit.updateOne(
            {ip: ip},
            { $inc: { attempt: 1 } },
            { upsert: true }
        )
        return('Success')
    }
    catch {
        return('Something went wrong')
    }
}

const rateLimitController = async(req, res, next) => {
    const failedAttempt = await findFailedAttempt(req.ip);
    if(failedAttempt?.attempt >= 3) {
        return res.status(403).json("You can only try 3 times in 5 minutes")
    } else {
        next()
    }
}

module.exports = {
    addFailedAttempt,
    rateLimitController
}