const product = require('../controllers/product');
const { productUpload } = require('../storage');


module.exports = (app) => {
    app.post('/api/product/create', productUpload.fields([
        {name: 'black'},
        {name: 'red'},
        {name: 'white'},
        {name: 'gray'}
    ]), product.createProduct);
    app.get('/api/product/get-all', product.getAllProducts);
    app.post('/api/product/search', product.searchProducts);
    app.get('/api/product/:id', product.getProductById);
    app.put('/api/product/edit/:id', productUpload.fields([
        {name: 'black'},
        {name: 'red'},
        {name: 'white'},
        {name: 'gray'}
    ]), product.updateProduct);
    app.delete('/api/product/delete/:id', product.deleteProduct);
};
