const validateProductInput = require('../validation/product');
const Product = require('../models/Product');

const createProduct = (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        details: JSON.parse(req.body.details),
        image: req.file ? req.file.filename : 'default.png',
        price: req.body.price,
        category: JSON.parse(req.body.category)
    });

    newProduct
        .save()
        .then(product => {
            res.json(product)
        });
};

const getAllProducts = (req, res) => {
    Product
        .find()
        .then(products => {
            if(!products) {
                errors.email = 'Products not found';
                return res.status(404).json(errors);
            }
            res.json(products);
        });
};

const searchProducts = (req, res) => {
    const search = new RegExp(req.body.search, 'i');
    const filter = {};
    if (req.body.color) {
        filter['details.color.value'] = req.body.color;
    }
    if (req.body.type) {
        filter['details.type.value'] = req.body.type;
    }
    if (req.body.form) {
        filter['details.form.value'] = req.body.form;
    }
    if (req.body.category) {
        filter['category.value'] = req.body.category;
    }

    Product
        .find()
        .or([
            {'title': search},
            {'description': search}
        ])
        .and([
            filter
        ])
        .then(products => {
            if(!products) {
                errors.email = 'Products not found';
                return res.status(404).json(errors);
            }
            res.json(products);
        });
};

const getProductById = (req, res) => {
    const id = req.params.id;
    Product
        .findById(id)
        .then(product => {
            if(!product) {
                errors.email = 'Product not found';
                return res.status(404).json(errors);
            }
            res.json(product);
        });
};

const updateProduct = (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Product
        .findById(req.params.id, (err, product) => {
            if (!product) {
                return res.status(404).send("data is not found");
            }

            console.log(req.body);
            product.title = req.body.title;
            product.description = req.body.description;
            product.details = JSON.parse(req.body.details);
            product.image = req.file ? req.file.filename : req.body.file;
            product.price = req.body.price;
            product.category = JSON.parse(req.body.category);

            product
                .save()
                .then(() => {
                    res.json('Product updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    Product
        .findByIdAndDelete(id)
        .then(() => {
            res.json('Product deleted!');
        });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};