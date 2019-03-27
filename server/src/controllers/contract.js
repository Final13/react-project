const validateContractInput = require('../validation/contract');
const Contract = require('../models/Contract');

const createContract = (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newContract = new Contract({
        number: req.body.number,
        customer: req.body.customer,
        stone: req.body.stone,
        extra: req.body.extra,
        info: req.body.info,
        info2: req.body.info2,
        payments: req.body.payments,
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
        .then(contracts => {
            if(!contracts) {
                errors.email = 'Contracts not found';
                return res.status(404).json(errors);
            }
            res.json(contracts);
        });
};

const searchContracts = (req, res) => {
    const search = new RegExp(req.body.search, 'i');
    const filter = {};
    if (req.body.color) {
         filter['stone.color.value'] = req.body.color;
    }
    if (req.body.type) {
        filter['stone.type.value'] = req.body.type;
    }
    if (req.body.form) {
        filter['stone.form.value'] = req.body.form;
    }

    Contract
        .find({ deleted: false })
        .or([
            {'number': search},
            {'customer.name': search},
            {'customer.phone': search},
            {'info.firstName': search},
            {'info.lastName': search},
            {'info.date': search},
            {'info2.firstName': search},
            {'info2.lastName': search},
            {'info2.date': search}
        ])
        .and([
            filter
        ])
        .then(contracts => {
            if(!contracts) {
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
            contract.number = req.body.number;
            contract.customer = req.body.customer;
            contract.stone = req.body.stone;
            contract.extra = req.body.extra;
            contract.info = req.body.info;
            contract.info2 = req.body.info2;
            contract.payments = req.body.payments;
            contract.total = req.body.total;
            contract.install = req.body.install;

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
    searchContracts,
    getContractById,
    updateContract,
    deleteContract,
};