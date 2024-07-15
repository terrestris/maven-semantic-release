/**
 * @typedef {'deploy'|'package jib:build'|'deploy jib:build'} MavenTarget
 */

/**
 * @typedef {Object} PluginConfig
 * @property {string} [settingsPath] Path to a maven settings file.
 * @property {boolean} processAllModules=false This sets the `processAllModules` option for the `versions:set` target. It is useful for multimodule projects.
 * @property {MavenTarget} mavenTarget='deploy' This determines which mvn targets are used to publish.
 * @property {boolean} clean=true Whether the `clean` target will be applied before publishing.
 * @property {boolean} updateSnapshotVersion=false Whether a new snapshot version should be set after releasing.
 * @property {string} snapshotCommitMessage='chore: setting next snapshot version [skip ci]' The commit message used if a new snapshot version should be created.
 * @property {boolean} debug=false Sets the `-X` option for all maven calls.
 * @property {boolean} mvnw=false Use the mvnw script instead of mvn
 */

const SemanticReleaseError = require("@semantic-release/error");

/**
 * @param {Partial<PluginConfig>} config
 * @returns {PluginConfig}
 * @private
 */
function evaluateConfig(config) {
    const withDefaults = Object.assign({
        processAllModules: false,
        mavenTarget: 'deploy',
        clean: true,
        updateSnapshotVersion: false,
        snapshotCommitMessage: 'chore: setting next snapshot version [skip ci]',
        debug: false,
        mvnw: false
    }, config);

    if (withDefaults.settingsPath && !/^[\w~./-]*$/.test(withDefaults.settingsPath)) {
        throw new SemanticReleaseError('Config settingsPath contains disallowed characters');
    }

    const availableTargets = [
        'deploy',
        'package jib:build',
        'deploy jib:build'
    ];

    if (!availableTargets.includes(withDefaults.mavenTarget)) {
        throw new SemanticReleaseError(`Unrecognized maven target ${withDefaults.mavenTarget}`);
    }

    return withDefaults;
}

module.exports = {
    evaluateConfig
};

