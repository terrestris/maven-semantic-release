const {
    deploy
} = require("./maven");

/**
 * @param {PluginConfig} pluginConfig
 * @param {Logger} logger
 * @param {Release} nextRelease
 * @returns {Promise<void>}
 */
module.exports = async function publish(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('publish mvn release');

    const settingsPath = pluginConfig.settingsPath || '.m2/settings.xml';
    const mavenTarget = pluginConfig.mavenTarget || 'deploy';
    const clean = pluginConfig.clean || true;

    if (!/^[\w~./-]*$/.test(settingsPath)) {
        throw new Error('config settingsPath contains disallowed characters');
    }

    const availableTargets = [
        'deploy',
        'package jib:build',
        'deploy jib:build'
    ];

    if (!availableTargets.includes(mavenTarget)) {
        throw new Error(`unrecognized maven target ${mavenTarget}`);
    }

    await deploy(logger, nextRelease.version, mavenTarget, settingsPath, clean);
};
