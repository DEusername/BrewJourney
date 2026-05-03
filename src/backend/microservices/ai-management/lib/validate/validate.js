// makes sure all required fields are present in the obj that was received (compare against expected schema)
export function validateAgainstSchema(obj, schema) {
    if (!obj) return false;

    return Object.keys(schema).every((field) => {
        const rule = schema[field];
        const value = obj[field];

        // required field missing
        if (rule.required && value == null) {
            return false;
        }

        return true;
    });
}

// only takes the fields that are expected (compare against expected schema)
export function extractValidFields(obj, schema) {
    if (!obj) return {};

    const validObj = {};

    Object.keys(schema).forEach((field) => {
        if (obj[field] !== undefined) {
            validObj[field] = obj[field];
        }
    });

    return validObj;
}