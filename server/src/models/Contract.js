const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    number: {
        type: String
    },
    customer: {
        type: Object
    },
    stone: {
        type: Object
    },
    extra: {
        type: Object
    },
    info: {
        type: Object
    },
    cemetery: {
        type: Object
    },
    payments: {
        type: Array
    },
    total: {
        type: Number
    },
    install: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contract = mongoose.model('contracts', ContractSchema);

module.exports = Contract;