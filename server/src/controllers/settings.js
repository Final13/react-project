const request = require('request');
const validateSettingsInput = require('../validation/settings');
const Settings = require('../models/Settings');

const getCurrency = (req, res) => {
    const { errors, isValid } = validateSettingsInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const options = {
        method: 'GET',
        //NBRB courses url
        url: 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/nationalRates',
        //USD code 840; EUR code: 978
        qs: { currencyCode: '840' }
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error);
        const currencies = JSON.parse(body);
        const rate = currencies.rates[0].rate;
        console.log(rate);

        Settings
            .findOne((err, settings) => {
                if (!settings) {
                    errors.settings = 'Settings not found';
                    return res.status(404).json(errors);
                }

                if(Number(settings.rate) === Number(rate)) {
                    return res.json('Course does not changed.');
                }
                settings.rateGrowth = rate - settings.rate;
                settings.rate = rate;
                settings
                    .save()
                    .then(() => {
                        res.json('Settings updated!');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send("Update not possible");
                    });
            });
        return rate;
    });
};

const getSettings = (req, res) => {
    Settings
        .findOne()
        .then((settings) => {
            if(!settings) {
                errors.settings = 'Settings not found';
                return res.status(404).json(errors);
            }
            res.json(settings);
        });
};

const updateSettings = (req, res) => {
    const { errors, isValid } = validateSettingsInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Settings
        .findOne((err, settings) => {
            if (!settings) {
                return res.status(404).send("data is not found");
            }

            settings.monumentPrice = (req.body.monumentPrice);
            settings.portraitPrice = req.body.portraitPrice;
            settings.textPrice = req.body.textPrice;
            settings.sizeCoefficient = (req.body.sizeCoefficient);
            settings.materialCoefficient = (req.body.materialCoefficient);

            settings
                .save()
                .then(() => {
                    res.json('Settings updated!');
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send("Update not possible");
                });
        });
};

module.exports = {
    getCurrency,
    getSettings,
    updateSettings,
};