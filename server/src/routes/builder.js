const builder = require('../controllers/builder');


module.exports = (app) => {
    app.get('/api/builder/get-all', builder.getAllBuilders);
};
