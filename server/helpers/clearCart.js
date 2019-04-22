const Cart = require('../models/cart');

module.exports = (done) => {
    if (process.env.NODE_ENV === 'test') {
        Cart
            .deleteMany({})
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
            });
    }
};