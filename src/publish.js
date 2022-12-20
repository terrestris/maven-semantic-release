const {
    deploy
} = require("./maven");

module.exports = async function publish (pluginConfig, {
    logger,
    nextRelease,
    options
}) {
    logger.log('publish mvn release');

    const settingsFile = pluginConfig.mavenSettingsPath || '.m2/settings.xml';
    const deployMethod = pluginConfig.mavenDeployMethod || 'deploy';

    await deploy(logger, nextRelease.version, deployMethod, settingsFile);
};
