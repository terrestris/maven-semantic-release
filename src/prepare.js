const {
    updateVersion
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
module.exports = async function prepare(pluginConfig, {
    logger,
    nextRelease
}) {
    logger.log('prepare maven release');

    if (!nextRelease?.version) {
        throw new SemanticReleaseError('Cannot prepare maven release without a version');
    }

    const {
        settingsPath,
        processAllModules,
        debug,
        mvnw
    } = evaluateConfig(pluginConfig);

    await updateVersion(logger, mvnw, nextRelease.version, settingsPath, processAllModules, debug);
};
