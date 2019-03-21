const validateContractInput = require('../validation/contract');
const Contract = require('../models/Contract');

const createContract = (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newContract = new Contract({
        customer: JSON.parse(req.body.customer),
        stone: JSON.parse(req.body.stone),
        extra: JSON.parse(req.body.extra),
        info: JSON.parse(req.body.info),
        payments: JSON.parse(req.body.payments),
        total: req.body.total,
        install: req.body.install,
    });

    newContract
        .save()
        .then(contract => {
            res.json(contract)
        });
};

const getAllContracts = (req, res) => {
    Contract
        .find({ deleted: false })
        .then(contract => {
            if(!contract) {
                errors.email = 'Contracts not found';
                return res.status(404).json(errors);
            }
            res.json(contracts);
        });
};

const getContractById = (req, res) => {
    const id = req.params.id;
    Contract
        .findById(id)
        .then(contract => {
            if(!contract) {
                errors.email = 'Contract not found';
                return res.status(404).json(errors);
            }
            res.json(contract);
        });
};

const updateContract = (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Contract
        .findById(req.params.id, (err, contract) => {
            if (!contract) {
                return res.status(404).send("data is not found");
            }
            contract.title = req.body.title;
            contract.description = req.body.description;
            contract.type = JSON.parse(req.body.type);
            contract.form = JSON.parse(req.body.form);
            contract.color = JSON.parse(req.body.color);
            contract.images = images;

            contract
                .save()
                .then(() => {
                    res.json('Contract updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
};

const deleteContract = (req, res) => {
    Contract
        .findById(req.params.id, (err, contract) => {
            if (!contract) {
                return res.status(404).send("data is not found");
            }

            contract.deleted = true;

            contract
                .save()
                .then(() => {
                    res.json('Contract deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
        });
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
};