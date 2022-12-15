const {
    updateVersion
} = require("./maven");

module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    await updateVersion(logger, nextRelease.version);
};
