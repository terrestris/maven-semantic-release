const {
    updateSnapshotVersion
} = require("./maven");

const {
    evaluateConfig
} = require('./plugin-config');

const {
    add,
    commit,
    push
} = require('@semantic-release/git/lib/git');

const glob = require("glob");

/**
 * @param {PluginConfig} pluginConfig
 * @param {Logger} logger
 * @param {ProcessEnv} env
 * @param {string} cwd
 * @param {string} branch
 * @param {string} repositoryUrl
 * @returns {Promise<void>}
 */
module.exports = async function success(pluginConfig, {
    logger,
    env,
    cwd,
    branch,
    options: { repositoryUrl }
}) {
    const {
        updateSnapshotVersion: updateSnapshotVersionOpt,
        snapshotCommitMessage,
        processAllModules,
        debug,
        settingsPath
    } = evaluateConfig(pluginConfig)

    const filesToCommit = await glob('**/pom.xml', {
        cwd,
        ignore: 'node_modules/**'
    });

    if (updateSnapshotVersionOpt) {
        await updateSnapshotVersion(logger, settingsPath, processAllModules, debug);
        const execaOptions = { env, cwd };
        logger.log('Staging all changed files: ' + filesToCommit.join(", "));
        await add(filesToCommit, execaOptions);
        logger.log('Committing all changed pom.xml');
        await commit(snapshotCommitMessage, execaOptions);
        logger.log('Pushing commit');
        await push(repositoryUrl, branch.name, execaOptions);
    }
};
