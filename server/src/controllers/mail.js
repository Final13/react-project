const sendgridMail = require('@sendgrid/mail');
const config = require('../config/app');
const validateEmailInput = require('../validation/email');

const sendMail = (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    sendgridMail.setApiKey(config.mailKey);
    const msg = {
        to: 'faxtalk666@gmail.com',
        from: req.body.email,
        subject: 'New Message!',
        text: `${req.body.name} ${req.body.phone} ${req.body.email} ${req.body.message}`,
        html: `Name: <b>${req.body.name}</b><br />
               Phone: <b>${req.body.phone}</b><br />
               Email: <b>${req.body.email}</b><br />
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
