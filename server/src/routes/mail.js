const mail = require('../controllers/mail');

module.exports = (app) => {
    app.post('/api/send-message', mail.sendMail);
};