/**
 * @typedef {Object} PluginConfig
 * @property {string} [settingsPath] Path to a maven settings file.
 * @property {boolean} [processAllModules=false] This sets the `processAllModules` option for the `versions:set` target. It is useful for multimodule projects.
 * @property {'deploy'|'package jib:build'|'deploy jib:build'} [mavenTarget='deploy'] This determines which mvn targets are used to publish.
 * @property {boolean} [clean=true] Whether the `clean` target will be applied before publishing.
 * @property {boolean} [updateSnapshotVersion=false] Whether a new snapshot version should be set after releasing.
 * @property {string} [snapshotCommitMessage='chore: setting next snapshot version [skip ci]'] The commit message used if a new snapshot version should be created.
 * @property {boolean} [debug=false] Sets the `-X` option for all maven calls.
 */

/**
 * @param {Partial<PluginConfig>} config
 * @returns {PluginConfig}
 */
function evaluateConfig(config) {
    const withDefaults = Object.assign({
        processAllModules: false,
        mavenTarget: 'deploy',
        clean: true,
        updateSnapshotVersion: false,
        snapshotCommitMessage: 'chore: setting next snapshot version [skip ci]',
        debug: false
    }, config);

    if (!/^[\w~./-]*$/.test(withDefaults.settingsPath)) {
        throw new Error('config settingsPath contains disallowed characters');
    }

    const availableTargets = [
        'deploy',
        'package jib:build',
        'deploy jib:build'
    ];

    if (!availableTargets.includes(withDefaults.mavenTarget)) {
        throw new Error(`unrecognized maven target ${withDefaults.mavenTarget}`);
    }

    return withDefaults;
}

module.exports = {
    evaluateConfig
};

