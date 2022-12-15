const {
    deploy
} = require("./maven");

module.exports = async function publish (pluginConfig, context) {
    const { logger, nextRelease, options } = context;
    logger.log('publish mvn release');

    const settingsFile = options.mavenSettingsPath || '.m2/settings.xml';

    await deploy(logger, nextRelease, settingsFile);
};
