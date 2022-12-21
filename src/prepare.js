const {
    updateVersion
} = require("./maven");

const {
    commitPomXml
} = require("./git");

module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    await updateVersion(logger, nextRelease.version);
    await commitPomXml(logger);
};
