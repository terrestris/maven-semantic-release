/*
 * This code is adapted from https://github.com/conveyal/maven-semantic-release/blob/79739ae24df92d246d6bcfa44ac32930796b627d/lib/maven.js
 */

const SemanticReleaseError = require("@semantic-release/error");

const { exec } = require('./exec');

/**
 * @param {Logger} logger
 * @param {string} versionStr
 * @param {string} settingsPath
 * @param {boolean} processAllModules
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function updateVersion(logger, versionStr, settingsPath, processAllModules, debug) {
    logger.log(`Updating pom.xml to version ${versionStr}`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];
    const debugOption = debug ? ['-X'] : []

    await exec(
        'mvn',
        [
            'versions:set',
            ...debugOption,
            '--batch-mode',
            '-DgenerateBackupPoms=false',
            '--settings',
            settingsPath,
            `-DnewVersion=${versionStr}`,
            ...processAllModulesOption
        ]
    );
}

/**
 * @param {Logger} logger
 * @param {string} settingsPath
 * @param {boolean} processAllModules
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function updateSnapshotVersion(logger, settingsPath, processAllModules, debug) {
    logger.log(`Update pom.xml to next snapshot version`);

    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];
    const debugOption = debug ? ['-X'] : []

    await exec(
        'mvn',
        [
            'versions:set',
            ...debugOption,
            '--batch-mode',
            '-DnextSnapshot=true',
            '--settings',
            settingsPath,
            '-DgenerateBackupPoms=false',
            ...processAllModulesOption
        ]
    );
}

/**
 * @param {Logger} logger
 * @param {string} nextVersion
 * @param {string} mavenTarget
 * @param {string} settingsPath
 * @param {boolean} clean
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function deploy(logger, nextVersion, mavenTarget, settingsPath, clean, debug) {
    logger.log('Deploying version %s with maven', nextVersion);

    const cleanOption = clean ? ['clean'] : [];
    const debugOption = debug ? ['-X'] : []

    try {
        await exec(
          'mvn',
          [
              ...cleanOption,
              ...mavenTarget.split(' '),
              ...debugOption,
              '--batch-mode',
              '-DskipTests',
              '--settings',
              settingsPath
          ]
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
