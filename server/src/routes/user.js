const user = require('../controllers/user');

module.exports = (app) => {
    app.post('/api/users/register', user.register);
    app.post('/api/users/login', user.login);
};
