const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateWorkInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.form = !isEmpty(data.form) ? data.form : '';
    data.color = !isEmpty(data.color) ? data.color : '';
    data.images = !isEmpty(data.images) ? data.images : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateWorkInput;