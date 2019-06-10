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
        images: {
            black: req.files.black ? req.files.black[0].filename : '',
            red: req.files.red ? req.files.red[0].filename : '',
            white: req.files.white ? req.files.white[0].filename : '',
            gray: req.files.gray ? req.files.gray[0].filename : '',
        },
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
        .sort({ _id: 1})
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
        .sort({ _id: 1})
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


            product.title = req.body.title;
            product.description = req.body.description;
            product.details = req.body.details;
            product.images = {
                black: req.files.black ? req.files.black[0].filename : req.body.black,
                red: req.files.red ? req.files.red[0].filename : req.body.red,
                white: req.files.white ? req.files.white[0].filename : req.body.white,
                gray: req.files.gray ? req.files.gray[0].filename : req.body.gray,
            };
            product.price = req.body.price;
            product.category = JSON.parse(req.body.category);

            product
                .save()
                .then(() => {
                    res.json('Product updated!');
                })
                .catch(err => {
                    console.log(err);
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