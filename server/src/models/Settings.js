const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    monumentPrice: {
        type: Number
    },
    portraitPrice: {
        type: Number
    },
    textPrice: {
        type: Number
    },
    sizeCoefficient: {
        type: Array
    },
    materialCoefficient: {
        type: Array
    },
    rate: {
        type: Number
    },
    rateGrowth: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Setting = mongoose.model('settings', SettingSchema);

module.exports = Setting;