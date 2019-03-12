const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: Object
    },
    form: {
        type: Object
    },
    color: {
        type: Object
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