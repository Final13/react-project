const Builder = require('../models/Builder');

const getAllBuilders = (req, res) => {
    Builder
        .find()
        .populate('contract')
        .then(builders => {
            if(!builders) {
                errors.email = 'Builders not found';
                return res.status(404).json(errors);
            }
            res.json(builders);
        });
};

module.exports = {
    getAllBuilders,
};