const work = require('../controllers/work');
const { workUpload } = require('../storage');


module.exports = (app) => {
    app.post('/api/works/create', workUpload.array('files'), work.createWork);
    app.get('/api/works/get-all', work.getAllWorks);
    app.post('/api/works/search', work.searchWorks);
    app.get('/api/works/:id', work.getWorkById);
    app.put('/api/works/edit/:id', workUpload.array('files'), work.updateWork);
    app.delete('/api/works/delete/:id', work.deleteWork);
};
