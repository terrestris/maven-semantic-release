/*
 * This code is adapted from https://github.com/conveyal/maven-semantic-release/blob/79739ae24df92d246d6bcfa44ac32930796b627d/lib/maven.js
 */

const SemanticReleaseError = require("@semantic-release/error");

const { exec } = require('./exec');

async function updateVersion(logger, versionStr, processAllModules) {
    logger.log(`Updating pom.xml to version ${versionStr}`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];

    await exec(
        'mvn',
        ['versions:set', '--batch-mode', '-DgenerateBackupPoms=false', `-DnewVersion=${versionStr}`, ...processAllModulesOption]
    );
}

async function updateSnapshotVersion(logger, processAllModules) {
    logger.log(`Update pom.xml to next snapshot version`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];

    await exec(
        'mvn',
        ['versions:set', '--batch-mode', '-DnextSnapshot=true', '-DgenerateBackupPoms=false', ...processAllModulesOption]
    );
}

async function deploy(logger, nextVersion, mavenTarget, settingsPath, clean) {
    logger.log('Deploying version %s with maven', nextVersion);

    const availableTargets = [
      'deploy',
      'package jib:build',
      'deploy jib:build'
    ];

    if (!availableTargets.includes(mavenTarget)) {
        throw new Error(`unrecognized maven target ${mavenTarget}`);
    }

    const cleanTarget = clean ? ['clean'] : [];

    try {
        await exec(
          'mvn',
          [...cleanTarget, ...mavenTarget.split(' '), '--batch-mode', '-DskipTests', '--settings', settingsPath]
        );
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
    updateSnapshotVersion,
    testMvn
};
