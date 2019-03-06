const work = require('../controllers/work');

module.exports = (app) => {
    app.post('/api/works/create', work.createWork);
    app.post('/api/works/get-all', work.getAllWorks);
};
