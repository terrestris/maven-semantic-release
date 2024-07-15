const {
    deploy
} = require("./maven");

const {
    evaluateConfig
} = require('./plugin-config');

const SemanticReleaseError = require("@semantic-release/error");

/**
 * @param {import("./plugin-config").PluginConfig} pluginConfig
 * @param {import("semantic-release").Context} context
 * @returns {Promise<void>}
 */
module.exports = async function publish(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('publish mvn release');

    if (!nextRelease?.version) {
        throw new SemanticReleaseError('Cannot publish mvn release without a version');
    }

    const {
        settingsPath,
        mavenTarget,
        clean,
        debug,
        mvnw
    } = evaluateConfig(pluginConfig);

    await deploy(logger, mvnw, nextRelease.version, mavenTarget, settingsPath, clean, debug);
};
