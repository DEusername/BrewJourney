// makes sure all required fields are present in the obj that was received (compare against expected schema)
export function validateAgainstSchema(obj, schema) {
    return obj && Object.keys(schema).every(
        field => !schema[field].required || obj[field] != undefined
    )
}

// only takes the fields that are expected (compare against expected schema)
export function extractValidFields(obj, schema) {
    let validObj = {}
    Object.keys(schema).forEach((field) => {
        if (obj[field] != undefined) {
            validObj[field] = obj[field]
        }
    })
    return validObj
}
