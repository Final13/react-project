const express = require('express');
const cors = require('cors');
const logger = require('morgan');

module.exports = (app) => {
    if (app.get('env') === 'production') {
        app.use(logger('combined'));
    } else {
        app.use(logger('dev'));
    }
    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
};