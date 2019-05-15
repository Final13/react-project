const product = require('../controllers/product');
const { productUpload } = require('../storage');


module.exports = (app) => {
    app.post('/api/product/create', productUpload.single('file'), product.createProduct);
    app.get('/api/product/get-all', product.getAllProducts);
    app.post('/api/product/search', product.searchProducts);
    app.get('/api/product/:id', product.getProductById);
    app.put('/api/product/edit/:id', productUpload.single('file'), product.updateProduct);
    app.delete('/api/product/delete/:id', product.deleteProduct);
};
