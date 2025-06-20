import * as execModule from '../src/exec.js';
import { updateVersion } from '../src/maven.js';
import { jest } from '@jest/globals';

// Use jest.spyOn to mock the ESM named export and store the mock
// @ts-ignore
const execMock = jest.spyOn(execModule, 'exec').mockImplementation(jest.fn());

describe('verboseMaven config', () => {
    const logger = { log: jest.fn(), error: jest.fn() };
    const pluginConfigBase = {
        processAllModules: false,
        mavenTarget: /** @type {import('../src/plugin-config.js').MavenTarget} */ ('deploy'),
        clean: true,
        updateSnapshotVersion: false,
        snapshotCommitMessage: '',
        debug: false,
        mvnw: false,
        verboseMaven: false
    };

    beforeEach(() => {
        execMock.mockClear();
        logger.log.mockClear();
        logger.error.mockClear();
    });

    it('should NOT echo maven commands by default', async () => {
        await updateVersion(logger, false, '1.2.3', undefined, false, false, false);
        expect(execMock).toHaveBeenCalledWith(
            'mvn',
            expect.any(Array),
            {},
            false // echo flag should be false by default
        );
    });

    it('should echo maven commands when verboseMaven is true', async () => {
        const pluginConfig = { ...pluginConfigBase, verboseMaven: true };
        await updateVersion(logger, false, '1.2.3', undefined, false, false, true);
        expect(execMock).toHaveBeenCalledWith(
            'mvn',
            expect.any(Array),
            {},
            true // echo flag should be true
        );
    });
});
