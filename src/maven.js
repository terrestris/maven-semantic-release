/*
 * This code is adapted from https://github.com/conveyal/maven-semantic-release/blob/79739ae24df92d246d6bcfa44ac32930796b627d/lib/maven.js
 */

const SemanticReleaseError = require("@semantic-release/error");

const { exec } = require('./exec');

/**
 * @param {Logger} logger
 * @param {string} versionStr
 * @param {boolean} processAllModules
 * @param {string} settingsPath
 * @returns {Promise<void>}
 */
async function updateVersion(logger, versionStr, processAllModules, settingsPath) {
    logger.log(`Updating pom.xml to version ${versionStr}`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];

    await exec(
        'mvn',
        ['versions:set', '--batch-mode', '-DgenerateBackupPoms=false', '--settings', settingsPath, `-DnewVersion=${versionStr}`, ...processAllModulesOption]
    );
}

async function updateSnapshotVersion(logger, processAllModules, settingsPath) {
    logger.log(`Update pom.xml to next snapshot version`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];

    await exec(
        'mvn',
        ['versions:set', '--batch-mode', '-DnextSnapshot=true', '--settings', settingsPath, '-DgenerateBackupPoms=false', ...processAllModulesOption]
    );
}

/**
 * @param {Logger} logger
 * @param {string} nextVersion
 * @param {string} mavenTarget
 * @param {string} settingsPath
 * @param {boolean} clean
 * @returns {Promise<void>}
 */
async function deploy(logger, nextVersion, mavenTarget, settingsPath, clean) {
    logger.log('Deploying version %s with maven', nextVersion);

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

/**
 * @param {Logger} logger
 * @returns {Promise<void>}
 */
async function testMvn(logger) {
    logger.log('Testing if mvn exists');
    try {
        await exec(
            'mvn',
            ['-v']
        )
    } catch (e) {
        logger.error('failed to run mvn');
        logger.error(e);
        throw new SemanticReleaseError('failed to run mvn');
    }
}

module.exports = {
    deploy,
    updateVersion,
    updateSnapshotVersion,
    testMvn
};
