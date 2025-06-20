const { add, commit, push } = require('@semantic-release/git/lib/git');

jest.mock('@semantic-release/git/lib/git');
jest.mock('glob', () => ({
  glob: jest.fn(() => Promise.resolve(['moduleA/pom.xml', 'moduleB/pom.xml']))
}));
jest.mock('../src/maven', () => ({
  updateSnapshotVersion: jest.fn(() => Promise.resolve()),
}));

const success = require('../src/success');
const logger = { log: jest.fn(), error: jest.fn() };

describe('success plugin commit message interpolation', () => {
    beforeEach(() => {
        add.mockClear();
        commit.mockClear();
        push.mockClear();
        logger.log.mockClear();
        logger.error.mockClear();
    });

    function getPluginConfig(overrides = {}) {
        return {
            processAllModules: false,
            mavenTarget: /** @type {import('../src/plugin-config').MavenTarget} */ ('deploy'),
            clean: true,
            updateSnapshotVersion: true,
            snapshotCommitMessage: 'chore: bump to ${nextRelease.version} [skip ci]',
            debug: false,
            mvnw: false,
            ...overrides
        };
    }

    it('should interpolate ${nextRelease.version} in the commit message', async () => {
        await success(getPluginConfig(), {
            logger,
            env: {},
            cwd: '/repo',
            branch: { name: 'main' },
            options: { repositoryUrl: 'git@github.com:foo/bar.git' },
            nextRelease: { version: '1.2.3' }
        });
        expect(commit).toHaveBeenCalledWith('chore: bump to 1.2.3 [skip ci]', expect.anything());
    });

    it('should not interpolate if updateSnapshotVersion is false', async () => {
        await success(getPluginConfig({ updateSnapshotVersion: false }), {
            logger,
            env: {},
            cwd: '/repo',
            branch: { name: 'main' },
            options: { repositoryUrl: 'git@github.com:foo/bar.git' },
            nextRelease: { version: '1.2.3' }
        });
        expect(commit).not.toHaveBeenCalled();
    });

    it('should leave unknown variables untouched', async () => {
        await success(getPluginConfig({ snapshotCommitMessage: 'chore: bump to ${nextRelease.unknown} [skip ci]' }), {
            logger,
            env: {},
            cwd: '/repo',
            branch: { name: 'main' },
            options: { repositoryUrl: 'git@github.com:foo/bar.git' },
            nextRelease: { version: '1.2.3' }
        });
        expect(commit).toHaveBeenCalledWith('chore: bump to ${nextRelease.unknown} [skip ci]', expect.anything());
    });
});
