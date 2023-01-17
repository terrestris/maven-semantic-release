const {
    updateVersion
} = require("./maven");

module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    const processAllModules = pluginConfig.processAllModules || true;

    await updateVersion(logger, nextRelease.version, processAllModules);
};
