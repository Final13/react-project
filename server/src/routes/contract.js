const contract = require('../controllers/contract');


module.exports = (app) => {
    app.post('/api/contract/create', contract.createContract);
    app.get('/api/contract/get-all', contract.getAllContracts);
    app.get('/api/contract/:id', contract.getContractById);
    app.put('/api/contract/edit/:id',  contract.updateContract);
    app.put('/api/contract/delete/:id', contract.deleteContract);
};
