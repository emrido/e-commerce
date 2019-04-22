const Cart = require('../models/cart')

module.exports = {
    authorization: function(req, res, next) {
        Cart
            .findById(req.params.id)
            .then(cart => {
                if (String(cart.buyer) !== req.authenticatedUser._id) {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                } else {
                    next()
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}