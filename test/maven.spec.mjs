import { exec } from '../src/exec.js';
import { updateVersion, updateSnapshotVersion, deploy, testMvn } from '../src/maven.js';
import { jest } from '@jest/globals';

jest.mock('../src/exec.js');

describe('maven', () => {
    const logger = { log: jest.fn(), error: jest.fn() };
    const pluginConfig = {
        processAllModules: false,
        mavenTarget: /** @type {import('../src/plugin-config.js').MavenTarget} */ ('deploy'),
        clean: true,
        updateSnapshotVersion: false,
        snapshotCommitMessage: '',
        debug: false,
        mvnw: false,
        verboseMaven: false
    };

    afterEach(() => {
        logger.log.mockClear();
        logger.error.mockClear();
    });

    test('updateVersion with all options off', () => {
        updateVersion(logger, false, '1.1.1', undefined, false, false, false);
        expect(exec).toHaveBeenCalledWith(
            'mvn',
            [
                'versions:set',
                '--batch-mode',
                '--no-transfer-progress',
                '-DgenerateBackupPoms=false',
                '-DnewVersion=1.1.1'
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith(`Updating pom.xml to version 1.1.1`);
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('updateVersion with all options on', () => {
        updateVersion(logger, true,  '1.1.2', 'some/path', true, true, true);
        expect(exec).toHaveBeenCalledWith(
            './mvnw',
            [
                'versions:set',
                '--settings',
                'some/path',
                '-X',
                '--batch-mode',
                '--no-transfer-progress',
                '-DgenerateBackupPoms=false',
                '-DnewVersion=1.1.2',
                '-DprocessAllModules'
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith(`Updating pom.xml to version 1.1.2`);
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('updateSnapshotVersion with all options off', () => {
        updateSnapshotVersion(logger, false, undefined, false, false, false);

        expect(exec).toHaveBeenCalledWith(
            'mvn',
            [
                'versions:set',
                '--batch-mode',
                '--no-transfer-progress',
                '-DnextSnapshot=true',
                '-DgenerateBackupPoms=false'
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith('Update pom.xml to next snapshot version');
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('updateSnapshotVersion with all options on', () => {
        updateSnapshotVersion(logger, true,  'some/path', true, true, true);

        expect(exec).toHaveBeenCalledWith(
        './mvnw',
            [
                'versions:set',
                '--settings',
                'some/path',
                '-X',
                '--batch-mode',
                '--no-transfer-progress',
                '-DnextSnapshot=true',
                '-DgenerateBackupPoms=false',
                '-DprocessAllModules'
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith('Update pom.xml to next snapshot version');
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('deploy with all options off', () => {
        deploy(logger, false, '1.1.3', 'deploy', undefined, false, false, false);

        expect(exec).toHaveBeenCalledWith(
            'mvn',
            [
                'deploy',
                '--batch-mode',
                '--no-transfer-progress',
                '-DskipTests',
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith(`Deploying version 1.1.3 with maven`);
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('deploy with all options on', () => {
        deploy(logger, true, '1.1.4', 'deploy jib:build', 'some/path', true, true, true);

        expect(exec).toHaveBeenCalledWith(
            './mvnw',
            [
                'clean',
                'deploy',
                'jib:build',
                '--settings',
                'some/path',
                '-X',
                '--batch-mode',
                '--no-transfer-progress',
                '-DskipTests'
            ]
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith(`Deploying version 1.1.4 with maven`);
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('testMvn with all options off', () => {
        testMvn(logger, false);

        expect(exec).toHaveBeenCalledWith(
            'mvn',
            ['-v']
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith('Testing if mvn exists');
        expect(logger.error).toHaveBeenCalledTimes(0);
    });

    test('testMvn with all options on', () => {
        testMvn(logger, true);

        expect(exec).toHaveBeenCalledWith(
            './mvnw',
            ['-v']
        );

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith('Testing if mvn exists');
        expect(logger.error).toHaveBeenCalledTimes(0);
    });
});
