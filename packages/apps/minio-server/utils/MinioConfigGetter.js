const config = require('config');

module.exports = function (name) {
    const getConfig = config.get(name);
    if (getConfig !== undefined) {
        console.log(name, " : ", getConfig);
        if (getConfig)
            return getConfig;
        else
            return ''
    }
    throw new Error("Environmental Variable " + name +
        " Missing. Please Provide It in default.json for development or production.json for production..");
    // return ''
};
