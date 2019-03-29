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
    info2: {
        type: Object
    },
    cemetery: {
        type: Object
    },
    payments: {
        type: Number
    },
    total: {
        type: Number
    },
    install: {
        type: Date
    },
    builder: {
        type: Schema.Types.ObjectId, ref: 'builders'
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