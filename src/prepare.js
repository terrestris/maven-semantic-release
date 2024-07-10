const {
    updateVersion
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
module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    const {
        settingsPath,
        processAllModules,
        debug
    } = evaluateConfig(pluginConfig);

    await updateVersion(logger, nextRelease.version, settingsPath, processAllModules, debug);
};
