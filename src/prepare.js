const {
    updateVersion
} = require("./maven");

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

    const settingsPath = pluginConfig.settingsPath || '.m2/settings.xml';

    if (!/^[\w~./-]*$/.test(settingsPath)) {
        throw new Error('config settingsPath contains disallowed characters');
    }

    const processAllModules = pluginConfig.processAllModules || false;
    const debug = pluginConfig.debug || false;

    await updateVersion(logger, nextRelease.version, settingsPath, processAllModules, debug);
};
