export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
};

export const friendlyFilename = (value) => {
    return value === undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}