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

const getWorkById = (req, res) => {
    const id = req.params.id;
    Work
        .findById(id)
        .then(work => {
            if(!work) {
                errors.email = 'Work not found';
                return res.status(404).json(errors);
            }
            res.json(work);
        });
};

const updateWork = (req, res) => {
    Work
        .findById(req.params.id, (err, work) => {
        if (!work) {
            return res.status(404).send("data is not found");
        }

            let images = [];
            req.files.forEach(image => {
                return images = [...images, image.filename]
            });

            work.title = req.body.title;
            work.description = req.body.description;
            work.type = JSON.parse(req.body.type);
            work.form = JSON.parse(req.body.form);
            work.color = JSON.parse(req.body.color);
            work.images = images;

            work
                .save()
                .then(() => {
                    res.json('Work updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
};

module.exports = {
    createWork,
    getAllWorks,
    getWorkById,
    updateWork,
};