const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    details: {
        type: Object
    },
    images: {
        type: Object
    },
    price: {
        type: Number
    },
    category: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;