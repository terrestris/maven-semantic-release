const {
    testMvn
} = require("./maven");

module.exports = async function prepare(pluginConfig, context) {
    const {
        logger
    } = context;
    await testMvn(logger);
};
