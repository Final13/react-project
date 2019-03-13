const work = require('../controllers/work');
const upload = require('../storage');


module.exports = (app) => {
    app.post('/api/works/create', upload.array('files'), work.createWork);
    app.post('/api/works/get-all', work.getAllWorks);
};
