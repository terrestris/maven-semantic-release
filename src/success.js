const {
    updateSnapshotVersion
} = require("./maven");

const {
    add,
    commit,
    push
} = require('@semantic-release/git/lib/git');

const glob = require("glob");

module.exports = async function success(pluginConfig, {
    logger,
    env,
    cwd,
    branch,
    options: { repositoryUrl }
}) {
    const updateSnapshotVersionOpt = pluginConfig.updateSnapshotVersion || false;
    const snapshotCommitMessage = pluginConfig.snapshotCommitMessage || 'chore: setting next snapshot version [skip ci]';
    const processAllModules = pluginConfig.processAllModules || false;

    const filesToCommit = await glob('**/pom.xml', { ignore: 'node_modules/**' });

    if (updateSnapshotVersionOpt) {
        await updateSnapshotVersion(logger, processAllModules);
        const execaOptions = { env, cwd };
        logger.log('Staging all changed files: ' + filesToCommit.join(", "));
        await add(filesToCommit, execaOptions);
        logger.log('Committing all changed pom.xml');
        await commit(snapshotCommitMessage, execaOptions);
        logger.log('Pushing commit');
        await push(repositoryUrl, branch.name, execaOptions);
    }
};
