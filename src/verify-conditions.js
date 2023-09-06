const {
    testMvn
} = require("./maven");

/**
 * @param {PluginConfig} pluginConfig
 * @param {Logger} logger
 * @returns {Promise<void>}
 */
module.exports = async function verifyConditions(pluginConfig, {
    logger
}) {
    await testMvn(logger);
};
