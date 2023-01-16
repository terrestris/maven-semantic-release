const {
    deploy
} = require("./maven");

module.exports = async function publish(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('publish mvn release');

    const settingsPath = pluginConfig.settingsPath || '.m2/settings.xml';
    const mavenTarget = pluginConfig.mavenTarget || 'deploy';
    const clean = pluginConfig.clean || true;

    if (!/^[\w~./]$/.test(settingsPath)) {
        throw new Error('config settingsPath contains disallowed characters');
    }

    await deploy(logger, nextRelease.version, mavenTarget, settingsPath, clean);
};
