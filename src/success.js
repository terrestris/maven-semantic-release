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

const { glob } = require("glob");

/**
 * @param {import("./plugin-config").PluginConfig} pluginConfig
 * @param {import("semantic-release").Context & { cwd: string }} context
 * @returns {Promise<void>}
 */
module.exports = async function success(pluginConfig, {
    logger,
    env,
    cwd,
    branch,
    options
}) {
    const {
        updateSnapshotVersion: updateSnapshotVersionOpt,
        snapshotCommitMessage,
        processAllModules,
        debug,
        settingsPath,
        mvnw
    } = evaluateConfig(pluginConfig)

    if (!updateSnapshotVersionOpt) {
        return;
    }

    await updateSnapshotVersion(logger, mvnw, settingsPath, processAllModules, debug);
    if (!options?.repositoryUrl) {
        logger.error('No git repository url configured. No files are commited.');
        return;
    }

    const filesToCommit = await glob('**/pom.xml', {
        cwd,
        ignore: 'node_modules/**'
    });

    const execaOptions = {env, cwd};
    logger.log('Staging all changed files: ' + filesToCommit.join(", "));
    await add(filesToCommit, execaOptions);
    logger.log('Committing all changed pom.xml');
    await commit(snapshotCommitMessage, execaOptions);
    logger.log('Pushing commit');
    await push(options.repositoryUrl, branch.name, execaOptions);
};
