const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateEmailInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.message = !isEmpty(data.message) ? data.message : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateEmailInput;
