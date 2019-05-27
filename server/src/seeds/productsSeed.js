const Product = require('../models/Product');

module.exports = () => {
    Product.find({}).exec((err, collection) => {
        if (collection.length === 0) {
            Product.create({
                title: 'Product One',
                description: 'Product One Description',
                image: '1',
                price: 1,
                details : {
                    detail: ''
                },
                category: {value: 'monument', label: 'Monument'},
            });
            Product.create({
                title: 'Product Two',
                description: 'Product Two Description',
                image: null,
                price: 1.1,
                details : {
                    detail: ''
                },
                category: {value: 'monument', label: 'Monument'},
            });
            Product.create({
                title: 'Product Three',
                description: 'Product Three Description',
                image: null,
                price: 1.2,
                details : {
                    detail: ''
                },
                category: {value: 'monument', label: 'Monument'},
            });
            Product.create({
                title: 'Product Four',
                description: 'Product Four Description',
                image: null,
                price: 1.3,
                details : {
                    detail: ''
                },
                category: {value: 'monument', label: 'Monument'},
            });
            Product.create({
                title: 'Product Five',
                description: 'Product Five Description',
                image: null,
                price: 1.4,
                details : {
                    detail: ''
                },
                category: {value: 'monument', label: 'Monument'},
            });
        }
    });
};
