const {
    updateSnapshotVersion
} = require("./maven");

const {
    add,
    commit,
    push
} = require('@semantic-release/git/lib/git')

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

    if (updateSnapshotVersionOpt) {
        await updateSnapshotVersion(logger, processAllModules);
        const execaOptions = { env, cwd };
        logger.log('Staging pom.xml');
        await add(['pom.xml'], execaOptions);
        logger.log('Committing pom.xml');
        await commit(snapshotCommitMessage, execaOptions);
        logger.log('Pushing commit');
        await push(repositoryUrl, branch.name, execaOptions);
    }
};
