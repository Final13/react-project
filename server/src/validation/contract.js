const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateContractInput = (data) => {
    let errors = {};
    data.number = !isEmpty(data.number) ? data.number : '';
    data.customer = !isEmpty(data.customer) ? data.customer : {};
    data.stone = !isEmpty(data.stone) ? data.stone : {};
    data.extra = !isEmpty(data.extra) ? data.extra : {};
    data.info = !isEmpty(data.info) ? data.info : {};
    data.cemetery = !isEmpty(data.cemetery) ? data.cemetery : {};
    data.payments = !isEmpty(data.payments) ? data.payments : [];
    data.total = !isEmpty(data.total) ? data.total : '';
    data.install = !isEmpty(data.install) ? data.install : '';

    if(Validator.isEmpty(data.number)) {
        errors.number = 'Contract number is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateContractInput;