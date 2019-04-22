const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name required']
    },
    price: {
        type: Number,
        required: [true, 'Product price required'],
        min: [1, 'invalid input']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock required'],
        min: [1, 'Invalid input']
    },
    description: {
        type: String,
        required: [true, 'Product description required']
    },
    image: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;