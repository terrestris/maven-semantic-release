const execa = require('execa');

/**
 * @param {string} file
 * @param {string[]} options
 */
function exec(file, options) {
    const childProcess = execa(file, options);
    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
    return childProcess;
}

module.exports = {
    exec
};
