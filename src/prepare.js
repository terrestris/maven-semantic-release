const {
    updateVersion
} = require("./maven");

module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    const processAllModules = pluginConfig.processAllModules || false;

    await updateVersion(logger, nextRelease.version, processAllModules);
};
