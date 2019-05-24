const userSeed = require('./usersSeed');
const productSeed = require('./productsSeed');
const settingsSeed = require('./settingsSeed');

module.exports = () => {
    userSeed();
    productSeed();
    settingsSeed();
};