const {
    testMvn
} = require("./maven");

module.exports = async function verifyConditions(pluginConfig, context) {
    const {
        logger
    } = context;
    await testMvn(logger);
};
