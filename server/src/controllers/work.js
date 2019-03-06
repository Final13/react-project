const validateWorkInput = require('../validation/work');
const Work = require('../models/Work');

const createWork = (req, res) => {
    const { errors, isValid } = validateWorkInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newWork = new Work({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        form: req.body.form,
        color: req.body.color,
        images: req.body.images,
    });

    newWork
        .save()
        .then(work => {
            res.json(work)
        });
};

const getAllWorks = (req, res) => {

    Work
        .find()
        .then(works => {
            if(!works) {
                errors.email = 'Works not found';
                return res.status(404).json(errors);
            }
            res.json(works);
        });
};

module.exports = {
    createWork,
    getAllWorks
};