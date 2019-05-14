const Product = require('../models/Product');

module.exports = () => {
    Product.find({}).exec((err, collection) => {
        if (collection.length === 0) {
            Product.create({ title: 'Product One' });
            Product.create({ title: 'Product Two' });
            Product.create({ title: 'Product Three' });
            Product.create({ title: 'Product Four' });
            Product.create({ title: 'Product Five' });
        }
    });
};
