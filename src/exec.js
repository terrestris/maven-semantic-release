import { execa } from 'execa';

/**
 * @param {string} file
 * @param {string[]} options
 * @param {object} [execaOpts] Optional execa options
 * @param {boolean} [echo] If true, echo the command (execa verbose: 'short')
 * @private
 */
export function exec(file, options, execaOpts = {}, echo = false) {
    // Only use verbose: 'short' if echo is true
    const childProcess = execa(file, options, echo ? { verbose: 'short', ...execaOpts } : execaOpts);
    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
    return childProcess;
}
