/*
 * This code is adapted from https://github.com/conveyal/maven-semantic-release/blob/79739ae24df92d246d6bcfa44ac32930796b627d/lib/maven.js
 */

const SemanticReleaseError = require("@semantic-release/error");

const { exec } = require('./exec');

/**
 * @param {string|undefined} settingsPath
 * @returns {string[]}
 */
function settingsOption(settingsPath) {
    if (settingsPath) {
        return [
            '--settings',
            settingsPath
        ];
    } else {
        return [];
    }
}

/**
 * @param {Logger} logger
 * @param {boolean} mvnw
 * @param {string} versionStr
 * @param {string|undefined} settingsPath
 * @param {boolean} processAllModules
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function updateVersion(logger, mvnw, versionStr, settingsPath, processAllModules, debug) {
    logger.log(`Updating pom.xml to version ${versionStr}`);

    const command = mvnw ? './mvnw' : 'mvn';
    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];
    const debugOption = debug ? ['-X'] : []

    try {
        await exec(
            command,
            [
                'versions:set',
                ...debugOption,
                '--batch-mode',
                '--no-transfer-progress',
                '-DgenerateBackupPoms=false',
                ...settingsOption(settingsPath),
                `-DnewVersion=${versionStr}`,
                ...processAllModulesOption
            ]
        );
    } catch (e) {
        logger.error('Failed to update version');
        logger.error(/** @type {Error} */(e));
        throw new SemanticReleaseError('Failed to update version');
    }
}

/**
 * @param {Logger} logger
 * @param {boolean} mvnw
 * @param {string|undefined} settingsPath
 * @param {boolean} processAllModules
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function updateSnapshotVersion(logger, mvnw, settingsPath, processAllModules, debug) {
    logger.log(`Update pom.xml to next snapshot version`);

    const command = mvnw ? './mvnw' : 'mvn';
    const processAllModulesOption = processAllModules ? ['-DprocessAllModules'] : [];
    const debugOption = debug ? ['-X'] : []

    try {
        await exec(
            command,
            [
                'versions:set',
                ...debugOption,
                '--batch-mode',
                '--no-transfer-progress',
                '-DnextSnapshot=true',
                ...settingsOption(settingsPath),
                '-DgenerateBackupPoms=false',
                ...processAllModulesOption
            ]
        );
    } catch (e) {
        logger.error('Failed to update snapshot version');
        logger.error(/** @type {Error} */(e));
        throw new SemanticReleaseError('Failed to update snapshot version');
    }
}

/**
 * @param {Logger} logger
 * @param {boolean} mvnw
 * @param {string} nextVersion
 * @param {import("./plugin-config").MavenTarget} mavenTarget
 * @param {string|undefined} settingsPath
 * @param {boolean} clean
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
async function deploy(logger, mvnw, nextVersion, mavenTarget, settingsPath, clean, debug) {
    logger.log(`Deploying version ${nextVersion} with maven`);

    const command = mvnw ? './mvnw' : 'mvn';
    const cleanOption = clean ? ['clean'] : [];
    const debugOption = debug ? ['-X'] : []

    try {
        await exec(
          command,
          [
              ...cleanOption,
              ...mavenTarget.split(' '),
              ...debugOption,
              '--batch-mode',
              '--no-transfer-progress',
              '-DskipTests',
              ...settingsOption(settingsPath)
          ]
        );
    } catch (e) {
        logger.error('Failed to deploy to maven');
        logger.error(/** @type {Error} */(e));
        throw new SemanticReleaseError('Failed to deploy to maven');
    }
}

/**
 * @param {Logger} logger
 * @param {boolean} mvnw
 * @returns {Promise<void>}
 */
async function testMvn(logger, mvnw) {
    logger.log('Testing if mvn exists');

    const command = mvnw ? './mvnw' : 'mvn';

    try {
        await exec(
            command,
            ['-v']
        )
    } catch (e) {
        logger.error('Failed to run mvn');
        logger.error(/** @type {Error} */(e));
        throw new SemanticReleaseError('Failed to run mvn');
    }
}

module.exports = {
    deploy,
    updateVersion,
    updateSnapshotVersion,
    testMvn
};
