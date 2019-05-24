const isEmpty = require('./is-empty');

const validateSettingsInput = (data) => {
    let errors = {};
    data.defaultPrices = !isEmpty(data.defaultPrices) ? data.defaultPrices : '';
    data.portraitPrice = !isEmpty(data.portraitPrice) ? data.portraitPrice : '';
    data.textPrice = !isEmpty(data.textPrice) ? data.textPrice : '';
    data.sizeCoefficient = !isEmpty(data.sizeCoefficient) ? data.sizeCoefficient : '';
    data.materialCoefficient = !isEmpty(data.materialCoefficient) ? data.materialCoefficient : '';
    data.rate = !isEmpty(data.rate) ? data.rate : 0;
    data.rateGrowth = !isEmpty(data.rateGrowth) ? data.rateGrowth : 0;

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateSettingsInput;