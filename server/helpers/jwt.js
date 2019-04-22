const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function(_id, name) {
        return jwt.sign({ _id, name } , process.env.JWT_SECRET)
    }
}