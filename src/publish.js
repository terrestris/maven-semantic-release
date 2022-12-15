const {
    deploy
} = require("./maven");

module.exports = async function publish (pluginConfig, {
    logger,
    nextRelease,
    options
}) {
    logger.log('publish mvn release');

    const settingsFile = options.mavenSettingsPath || '.m2/settings.xml';

    await deploy(logger, nextRelease.version, settingsFile);
};
