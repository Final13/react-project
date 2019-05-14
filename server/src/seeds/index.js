const userSeed = require('./usersSeed');
const productSeed = require('./productsSeed');

module.exports = () => {
    userSeed();
    productSeed();
};