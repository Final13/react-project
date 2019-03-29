const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BuilderSchema = new Schema({
    value: {
        type: String
    },
    label: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
});

const Builder = mongoose.model('builders', BuilderSchema);

module.exports = Builder;