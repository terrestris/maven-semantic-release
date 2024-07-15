const {
    exec
} = require('../src/exec');
const {updateVersion, updateSnapshotVersion, deploy, testMvn} = require("../src/maven");

jest.mock('../src/exec');

describe('maven', () => {
    const logger = { log: jest.fn(), error: jest.fn() };

    afterEach(() => {
        logger.log.mockClear();
        logger.error.mockClear();
    });

    test('updateVersion', () => {
        updateVersion(logger, false,  '1.1.1', undefined, false, false);
        expect(exec).toBeCalledWith(
            'mvn',
            [
                'versions:set',
                '--batch-mode',
                '--no-transfer-progress',
                '-DgenerateBackupPoms=false',
                '-DnewVersion=1.1.1'
            ]
        );

        expect(logger.log).toBeCalledTimes(1);
        expect(logger.log).toBeCalledWith(`Updating pom.xml to version 1.1.1`);
        expect(logger.error).toBeCalledTimes(0);

        updateVersion(logger, true,  '1.1.2', 'some/path', true, true);
        expect(exec).toBeCalledWith(
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

        expect(logger.log).toBeCalledTimes(2);
        expect(logger.log).toBeCalledWith(`Updating pom.xml to version 1.1.2`);
        expect(logger.error).toBeCalledTimes(0);
    });

    test('updateSnapshotVersion', () => {
        updateSnapshotVersion(logger, false, undefined, false, false);

        expect(exec).toBeCalledWith(
            'mvn',
            [
                'versions:set',
                '--batch-mode',
                '--no-transfer-progress',
                '-DnextSnapshot=true',
                '-DgenerateBackupPoms=false'
            ]
        );

        expect(logger.log).toBeCalledTimes(1);
        expect(logger.log).toBeCalledWith('Update pom.xml to next snapshot version');
        expect(logger.error).toBeCalledTimes(0);

        updateSnapshotVersion(logger, true,  'some/path', true, true);

        expect(exec).toBeCalledWith(
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

        expect(logger.log).toBeCalledTimes(2);
        expect(logger.log).toBeCalledWith('Update pom.xml to next snapshot version');
        expect(logger.error).toBeCalledTimes(0);
    });

    test('deploy', () => {
        deploy(logger, false, '1.1.3', 'deploy', undefined, false, false);

        expect(exec).toBeCalledWith(
            'mvn',
            [
                'deploy',
                '--batch-mode',
                '--no-transfer-progress',
                '-DskipTests',
            ]
        );

        expect(logger.log).toBeCalledTimes(1);
        expect(logger.log).toBeCalledWith(`Deploying version 1.1.3 with maven`);
        expect(logger.error).toBeCalledTimes(0);

        deploy(logger, true, '1.1.4', 'deploy jib:build', 'some/path', true, true);

        expect(exec).toBeCalledWith(
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

        expect(logger.log).toBeCalledTimes(2);
        expect(logger.log).toBeCalledWith(`Deploying version 1.1.4 with maven`);
        expect(logger.error).toBeCalledTimes(0);
    });

    test('testMvn', () => {
        testMvn(logger, false);

        expect(exec).toBeCalledWith(
            'mvn',
            ['-v']
        );

        expect(logger.log).toBeCalledTimes(1);
        expect(logger.log).toBeCalledWith('Testing if mvn exists');
        expect(logger.error).toBeCalledTimes(0);

        testMvn(logger, true);

        expect(exec).toBeCalledWith(
            './mvnw',
            ['-v']
        );

        expect(logger.log).toBeCalledTimes(2);
        expect(logger.log).toBeCalledWith('Testing if mvn exists');
        expect(logger.error).toBeCalledTimes(0);
    });
});
