const {
    testMvn
} = require("./maven");

module.exports = async function prepare(logger) {
    await testMvn(logger);
};
