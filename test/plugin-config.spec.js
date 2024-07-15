const {evaluateConfig} = require("../src/plugin-config");

describe('evaluateConfig', () => {
    test('will reject settings path with illegal characters', () => {
        expect(() => {
            evaluateConfig({ settingsPath: '; echo "test"' });
        }).toThrow('Config settingsPath contains disallowed characters')
    });

    test('will reject unknown maven target', () => {
        expect(() => {
            evaluateConfig({
                // @ts-ignore
                mavenTarget: 'unknown-target'
            });
        }).toThrow('Unrecognized maven target unknown-target')
    })
});
