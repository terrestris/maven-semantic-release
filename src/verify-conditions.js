const {
    testMvn
} = require("./maven");

const {
    evaluateConfig
} = require("./plugin-config");

/**
 * @param {PluginConfig} pluginConfig
 * @param {Logger} logger
 * @returns {Promise<void>}
 */
module.exports = async function verifyConditions(pluginConfig, {
    logger
}) {
    const {
        mvnw
    } = evaluateConfig(pluginConfig);
    await testMvn(logger, mvnw);
};
