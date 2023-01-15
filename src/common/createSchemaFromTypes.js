const createSchemaFromTypes = (types) => {
    let schema = {}
    
    for(let i = 0; i < types.length; i++) {
        schema[types[i]] = {
            type: Boolean,
            required: true
        }
    }

    return schema
}

module.exports = {
    createSchemaFromTypes
}