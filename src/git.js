const { exec } = require('./exec');

async function commitPomXml(logger) {
    logger.log(`Stage pom.xml in git`);
    await exec(
        'git',
        ['add', 'pom.xml']
    );
    logger.log('Commit pom.xml in git');
    await exec(
        'git',
        ['commit', '--amend']
    )
}

module.exports = {
    commitPomXml
};
