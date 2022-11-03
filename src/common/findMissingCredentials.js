const findMissingCredentials = (body, requiredFields) => {
    const credentials = Object.keys(body)

    const missingCredentials = requiredFields.filter(requiredField => {
        return !credentials.includes(requiredField)   
    })

    return missingCredentials
}

module.exports = {
    findMissingCredentials
} 