const sendgridMail = require('@sendgrid/mail');
const config = require('../config/app');

const sendMail = (req, res) => {
    sendgridMail.setApiKey(config.mailKey);
    const msg = {
        to: 'faxtalk666@gmail.com',
        from: req.body.email,
        subject: 'New Request For Development!',
        text: `${req.body.name} ${req.body.phone} ${req.body.website} ${req.body.email} ${req.body.message}`,
        html: `Name: <b>${req.body.name}</b><br />
               Phone: <b>${req.body.phone}</b><br />
               Email: <b>${req.body.email}</b><br />
               Website: <b>${req.body.website}</b><br />
               Message: <b>${req.body.message}</b><br />`
    };

    sendgridMail.send(msg)
        .then(() => {
            return res.json('success');
        })
        .catch((error) => {
            return res.json(error);
        });
};

module.exports = {
    sendMail
};
