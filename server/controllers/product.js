const Product = require('../models/product');
const { ObjectId } = require('mongoose').Types;

class ProductController {
    static addProduct(req, res) {
        Product
            .create({
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                description: req.body.description,
                image: req.file ? req.file.cloudStoragePublicUrl : 'https://cdn.vuetifyjs.com/images/cards/kitchen.png'
            })
            .then(newProduct => {
                res
                    .status(201)
                    .json(newProduct);
            })
            .catch(err => {
                if (RegExp('validation').test(err.message)) {
                    res
                        .status(403)
                        .json({
                            message: err.message
                        })
                } else {
                    res
                        .status(500)
                        .json({
                            message: err.message
                        });
                }
            });
    };

    static listProduct(req, res) {
        Product
            .find({})
            .then(products => {
                res
                .status(200)
                .json(products);
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: err.message
                });
            });
    };

    static detailProduct(req, res) {
        Product
            .findById(req.params.id)
            .then(product => {
                if (product) {
                    res
                        .status(200)
                        .json(product);
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        });
                };
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            });
    };

    static updateProduct(req, res) {
        Product
            .updateOne({
                _id: ObjectId(req.params.id)
            }, {
                    $set: req.body
                })
            .then(result => {
                res
                    .status(200)
                    .json(result)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            });
    };

    static deleteProduct(req, res) {
        Product
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                res
                    .status(200)
                    .json(result)
            })
            .catch(err => {
                if (RegExp('Cast to ObjectId failed').test(err.message)) {
                    res
                        .status(400)
                        .json({
                            message: err.message
                        })
                } else {
                    res
                        .status(500)
                        .json({
                            message: err.message
                        });
                }
            });
    };
};

module.exports = ProductController;