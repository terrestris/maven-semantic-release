const {
    testMvn
} = require("./maven");

const {
    evaluateConfig
} = require("./plugin-config");

/**
 * @param {import("./plugin-config").PluginConfig} pluginConfig
 * @param {{ logger: Logger}} params
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
