const bcrypt = require('bcryptjs');

module.exports = {
    encrypt: (password) => {
        return bcrypt.hashSync(password, Number(process.env.SALT));
    },

    decrypt: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
}