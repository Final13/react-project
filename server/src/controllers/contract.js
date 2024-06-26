const validateContractInput = require('../validation/contract');
const Contract = require('../models/Contract');
const Builder = require('../models/Builder');
const mongoose = require('mongoose');

const createContract = (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Builder
        .findById(req.body.builder._id, (err, builder) => {
            if (!builder) {
                builder = new Builder({
                    value: req.body.builder.name,
                    label: req.body.builder.name,
                    name: req.body.builder.name,
                    phone: req.body.builder.phone
                });
            }

            builder
                .save((err) => {
                    if(err) return console.error(err.stack);

                    const newContract = new Contract({
                        builder: builder._id,
                        number: req.body.number,
                        image: req.body.image,
                        customForm: req.body.customForm,
                        customer: req.body.customer,
                        stone: req.body.stone,
                        extra: req.body.extra,
                        mainInfo: req.body.mainInfo,
                        otherInfo: req.body.otherInfo,
                        cemetery: req.body.cemetery,
                        payments: req.body.payments,
                        total: req.body.total,
                        install: req.body.install || new Date(new Date().setMonth(new Date().getMonth() + 1)),
                    });

                    newContract.mainInfo.forEach(info => {
                        info.dateOfBirth = info.dateOfBirth ? new Date(info.dateOfBirth) : '';
                        info.dateOfDeath = info.dateOfDeath ? new Date(info.dateOfDeath) : '';
                    });

                    newContract
                        .save()
                        .then(contract => {
                            res.json(contract)
                        });
                });
        });
};

const getAllContracts = (req, res) => {
    Contract
        .find({ deleted: false })
        .populate('builder')
        .sort({ _id: 1})
        .then(contracts => {
            if(!contracts) {
                errors.email = 'Contracts not found';
                return res.status(404).json(errors);
            }
            res.json(contracts);
        });
};

const searchContracts = (req, res) => {
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    const search = new RegExp(escapeRegExp(req.body.search), 'i');
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
    if (req.body.size) {
        filter['stone.size.value'] = req.body.size;
    }
    if (req.body.builder._id) {
        filter['builder._id'] = mongoose.Types.ObjectId(req.body.builder._id);

    }

    Contract
        .aggregate([
            {
                $lookup:
                    {
                        from: 'builders',
                        localField: 'builder',
                        foreignField: '_id',
                        as: 'builder'
                    }
            },
            {
                $unwind: "$builder"
            },
            {
                $match: {
                    deleted: false,
                    $or : [
                        {'number': search},
                        {'customer.name': search},
                        {'customer.phone': search},
                        {'mainInfo': {$elemMatch: {firstName: search}}},
                        {'mainInfo': {$elemMatch: {secondName: search}}},
                        {'mainInfo': {$elemMatch: {lastName: search}}},
                        {'mainInfo': {$elemMatch: {dateOfBirth: search}}},
                        {'mainInfo': {$elemMatch: {dateOfDeath: search}}},
                        {'builder.name': search},
                        {'builder.phone': search}
                    ],
                    $and: [
                        filter
                    ]
                }
            }
        ])
        .sort({ _id: 1})
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
        .populate('builder')
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

    Builder
        .findById(req.body.builder._id, (err, builder) => {
            if (!builder) {
                builder = new Builder({
                    value: req.body.builder.name,
                    label: req.body.builder.name,
                    name: req.body.builder.name,
                    phone: req.body.builder.phone
                });
            }

            builder
                .save((err) => {
                    if(err) return console.error(err.stack);

                    Contract
                        .findById(req.params.id, (err, contract) => {
                            if (!contract) {
                                return res.status(404).send('data is not found');
                            }
                            contract.builder = builder._id;
                            contract.number = req.body.number;
                            contract.image = req.body.image;
                            contract.customForm = req.body.customForm;
                            contract.customer = req.body.customer;
                            contract.stone = req.body.stone;
                            contract.extra = req.body.extra;
                            contract.mainInfo = req.body.mainInfo;
                            contract.otherInfo = req.body.otherInfo;
                            contract.cemetery = req.body.cemetery;
                            contract.payments = req.body.payments;
                            contract.total = req.body.total;
                            contract.install = req.body.install || new Date(new Date().setMonth(new Date().getMonth() + 1));

                            contract
                                .save()
                                .then(() => {
                                    res.json('Contract updated!');
                                })
                                .catch(err => {
                                    res.status(400).send('Update not possible');
                                });
                        });
                });
        });
};

const deleteContract = (req, res) => {
    Contract
        .findById(req.params.id, (err, contract) => {
            if (!contract) {
                return res.status(404).send('data is not found');
            }

            contract.deleted = true;

            contract
                .save()
                .then(() => {
                    res.json('Contract deleted!');
                })
                .catch(err => {
                    res.status(400).send('Delete not possible');
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