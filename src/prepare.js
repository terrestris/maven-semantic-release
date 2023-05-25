const {
    updateVersion
} = require("./maven");

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

    await updateVersion(logger, nextRelease.version, processAllModules, settingsPath);
};
