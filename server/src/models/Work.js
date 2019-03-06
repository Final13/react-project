const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    form: {
        type: String
    },
    color: {
        type: String
    },
    images: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Work = mongoose.model('works', WorkSchema);

module.exports = Work;