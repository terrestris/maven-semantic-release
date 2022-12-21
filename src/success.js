const {
    updateSnapshotVersion
} = require("./maven");

const {
    add,
    commit,
    push
} = require('@semantic-release/git/lib/git')

module.exports = async function success (pluginConfig, {
    logger,
    env,
    cwd,
    branch,
    options: { repositoryUrl }
}) {
    logger.log('publish mvn release');

    const updateSnapshotVersionOpt = pluginConfig.updateSnapshotVersion || false;
    if (updateSnapshotVersionOpt) {
        await updateSnapshotVersion(logger);
        const execaOptions = { env, cwd };
        logger.log('Staging pom.xml');
        await add(['pom.xml'], execaOptions);
        logger.log('Committing pom.xml');
        await commit('Setting next snapshot version [skip ci]', execaOptions);
        logger.log('Pushing commit');
        await push(repositoryUrl, branch.name, execaOptions);
    }
};
