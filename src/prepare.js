const {
    updateVersion
} = require("./maven");

module.exports = async function prepare(pluginConfig, context) {
    const { logger, nextRelease } = context;
    logger.log('prepare maven release');

    await updateVersion(logger, nextRelease);
};
