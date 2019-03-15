const work = require('../controllers/work');
const upload = require('../storage');


module.exports = (app) => {
    app.post('/api/works/create', upload.array('files'), work.createWork);
    app.get('/api/works/get-all', work.getAllWorks);
    app.get('/api/works/:id', work.getWorkById);
    app.put('/api/works/edit/:id', work.updateWork);
};
