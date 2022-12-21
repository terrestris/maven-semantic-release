const { exec } = require('./exec');

async function stagePomXml(logger) {
    logger.log(`Stage pom.xml in git`);
    await exec(
        'git',
        ['add', 'pom.xml']
    );
}

module.exports = {
    stagePomXml
};
