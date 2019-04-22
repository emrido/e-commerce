const User = require('../models/user');

module.exports = (done) => {
    if (process.env.NODE_ENV === 'test') {
        User
            .deleteMany({})
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
            });
    }
};