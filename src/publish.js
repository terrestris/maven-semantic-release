const {
    deploy
} = require("./maven");

module.exports = async function publish (pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('publish mvn release');

    const settingsFile = pluginConfig.settingsPath || '.m2/settings.xml';
    const deployMethod = pluginConfig.deployMethod || 'deploy';

    await deploy(logger, nextRelease.version, deployMethod, settingsFile);
};
