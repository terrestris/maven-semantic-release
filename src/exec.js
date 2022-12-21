const execa = require('execa');

function exec() {
    const childProcess = execa(...arguments);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    return childProcess;
}

module.exports = {
    exec
};
