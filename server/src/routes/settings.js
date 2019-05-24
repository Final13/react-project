const settings = require('../controllers/settings');

module.exports = (app) => {
    app.post('/api/settings/currency', settings.getCurrency);
    app.get('/api/settings/get-settings', settings.getSettings);
    app.put('/api/settings/update', settings.updateSettings);
};
