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
        images: images.length > 0 ? images : 'default.png',
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

const searchWorks = (req, res) => {
    const search = new RegExp(req.body.search, 'i');
    const filter = {};
    if (req.body.color) {
        filter['color.value'] = req.body.color;
    }
    if (req.body.type) {
        filter['type.value'] = req.body.type;
    }
    if (req.body.form) {
        filter['form.value'] = req.body.form;
    }

    Work
        .find()
        .or([
            {'title': search},
            {'description': search}
        ])
        .and([
            filter
        ])
        .then(works => {
            if(!works) {
                errors.email = 'Contracts not found';
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
    const { errors, isValid } = validateWorkInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Work
        .findById(req.params.id, (err, work) => {
        if (!work) {
            return res.status(404).send("data is not found");
        }
            let images = [];
            req.files.forEach(image => {
                return images = [...images, image.filename]
            });
            
            //TODO: fix bug when array length = 1 in update
            if (req.body.files) {
                // if (req.body.files.length === 1)
                // {
                //     return images = [...images, req.body.files]
                // }
                Array.from(req.body.files).forEach(image => {
                    return images = [...images, image]
                });
            }
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

const deleteWork = (req, res) => {
    const id = req.params.id;
    Work
        .findByIdAndDelete(id)
        .then(() => {
            res.json('Work deleted!');
        });
};

module.exports = {
    createWork,
    getAllWorks,
    getWorkById,
    updateWork,
    deleteWork,
    searchWorks,
};