const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateProductInput = (data) => {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.details = !isEmpty(data.details) ? data.details : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.category = !isEmpty(data.category) ? data.category : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Заголовок обязателен для заполнения';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateProductInput;