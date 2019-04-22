const Product = require('../models/product');

module.exports = (done) => {
    if (process.env.NODE_ENV === 'test') {
        Product
            .deleteMany({})
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
            });
    }
};