const {
    deploy
} = require("./maven");

const {
    evaluateConfig
} = require('./plugin-config');

/**
 * @param {PluginConfig} pluginConfig
 * @param {Logger} logger
 * @param {Release} nextRelease
 * @returns {Promise<void>}
 */
module.exports = async function publish(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('publish mvn release');

    const {
        settingsPath,
        mavenTarget,
        clean,
        debug
    } = evaluateConfig(pluginConfig);

    await deploy(logger, nextRelease.version, mavenTarget, settingsPath, clean, debug);
};
