const validateWorkInput = require('../validation/work');
const Work = require('../models/Work');

const createWork = (req, res) => {
    const { errors, isValid } = validateWorkInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let images = [];
    req.files.forEach(image => {
        return images = [...images, image.filename]
    });

    const newWork = new Work({
        title: req.body.title,
        description: req.body.description,
        type: JSON.parse(req.body.type),
        form: JSON.parse(req.body.form),
        color: JSON.parse(req.body.color),
        images: images,
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