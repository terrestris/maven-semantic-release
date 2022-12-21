/*
 * This code is adapted from https://github.com/conveyal/maven-semantic-release/blob/79739ae24df92d246d6bcfa44ac32930796b627d/lib/maven.js
 */

const SemanticReleaseError = require("@semantic-release/error");

const { exec } = require('./exec');

async function updateVersion(logger, versionStr) {
    logger.log(`Updating pom.xml to version ${versionStr}`);
    await exec(
        'mvn',
        ['versions:set', '-DgenerateBackupPoms=false', `-DnewVersion=${versionStr}`]
    );
}

async function deploy(logger, nextRelease, deployMethod, settingsFile) {
    logger.log('Deploying version %s with maven', nextRelease.version);

    if (!['deploy', 'jib'].includes(deployMethod)) {
        throw new Error(`unrecognized deploy method ${deployMethod}`);
    }

    try {
        if (deployMethod === 'deploy') {
            await exec(
                'mvn',
                ['clean', 'deploy', '-DskipTests', '--settings', settingsFile]
            );
        } else if (deployMethod === 'jib') {
            await exec(
                'mvn',
                ['clean', 'package', 'jib:build', '-DskipTests', '--settings', settingsFile]
            );
        }
    } catch (e) {
        logger.error('failed to deploy to maven');
        logger.error(e);
        throw new SemanticReleaseError('failed to deploy to maven');
    }
}

async function testMvn(logger) {
    logger.log('Testing if mvn exists');
    try {
        await exec(
            'mvn',
            ['-v']
        )
    } catch (e) {
        logger.error('failed to run mvn');
        logger.errror(e);
        throw new SemanticReleaseError('failed to run mvn');
    }
}

module.exports = {
    deploy,
    updateVersion,
    testMvn
};
