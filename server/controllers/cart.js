const Cart = require('../models/cart');

class CartController {
    static createCart(req, res) {
        Cart
            .findOne({
                buyer: req.authenticatedUser._id
            })
            .then(found => {
                if (found) {
                    CartController.addItem(req, res)
                } else {
                    return Cart.create({
                        buyer: req.authenticatedUser._id,
                        items: req.body.item
                    })
                }
            })
            .then(newCart => {
                console.log(newCart)
                res
                    .status(201)
                    .json(newCart);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })
    };

    static addItem(req, res) {
        console.log(req.body)
        Cart
            .updateOne({
                buyer: req.authenticatedUser._id 
            }, {
                $push: {
                    items: req.body.item[0]
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    };

    static removeItem(req, res) {
        Cart
            .updateOne({
                buyer: req.authenticatedUser._id 
            }, {
                $pull: {
                    items: {
                        productId: req.body.product_id
                    }
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    };

    static getCart(req, res) {
        Cart
            .findOne({
                buyer: req.authenticatedUser._id
            })
            // .populate('Product')
            .populate('items.productId')
            .then(cart => {
                // console.log(cart[0].items)
                res.status(200).json(cart)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static deleteCart(req, res) {
        Cart
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                if(result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Cart not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            });
    };
}

module.exports = CartController;