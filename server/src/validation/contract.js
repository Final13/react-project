const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateContractInput = (data) => {
    let errors = {
        dateOfBirth: [],
        dateOfDeath: []
    };
    data.number = !isEmpty(data.number) ? data.number : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.customForm = !isEmpty(data.customForm) ? data.customForm : false;
    data.customer = !isEmpty(data.customer) ? data.customer : {};
    data.stone = !isEmpty(data.stone) ? data.stone : {};
    data.extra = !isEmpty(data.extra) ? data.extra : {};
    data.mainInfo = !isEmpty(data.mainInfo) ? data.mainInfo: [];
    data.otherInfo = !isEmpty(data.otherInfo) ? data.otherInfo: {};
    data.cemetery = !isEmpty(data.cemetery) ? data.cemetery : {};
    data.payments = !isEmpty(data.payments) ? data.payments : [];
    data.total = !isEmpty(data.total) ? data.total : '';
    data.install = !isEmpty(data.install) ? data.install : '';
    data.builder = !isEmpty(data.builder) ? data.builder : {};

    if(Validator.isEmpty(data.number)) {
        errors.number = 'Contract number is required';
    }

    if(Validator.isEmpty(data.customer.name)) {

        errors.customerName = 'Customer name is required';
    }

    if(Validator.isEmpty(data.customer.phone)) {

        errors.customerPhone = 'Customer phone is required';
    }

    if(Validator.isEmpty(data.builder.name)) {

        errors.builderName = 'Builder name is required';
        errors.builder = 'Builder is required';
    }

    if(Validator.isEmpty(data.builder.phone)) {

        errors.builderPhone = 'Builder phone is required';
    }

    if(Validator.isBefore(data.install)) {

        errors.install = 'This date already passed';
    }

    if(Validator.isAfter(data.install, (new Date(new Date().setFullYear(new Date().getFullYear() + 2))).toString())) {

        errors.install = 'This date is not too soon';
    }

    if(data.total < (data.payments.reduce((a,b) => a+b))) {

        errors.total = 'Total can not be less than payments';
    }

    data.mainInfo.forEach((info, index) => {
        if(Validator.isAfter(info.dateOfBirth, new Date().toString())) {
            errors.dateOfBirth[index] = 'Future date impossible';
        }

        if(Validator.isAfter(info.dateOfDeath, new Date().toString())) {
            errors.dateOfDeath[index] = 'Future date impossible';
        }

        if(Validator.isAfter(info.dateOfBirth.toString(), info.dateOfDeath.toString())) {
            errors.dateOfBirth[index] = 'Date of birth can not be after death';
            errors.dateOfDeath[index] = 'Date of death can not be before birth';
        }
    });

    errors.dateOfBirth.length === 0 && delete errors.dateOfBirth;
    errors.dateOfDeath.length === 0 && delete errors.dateOfDeath;

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateContractInput;