const User              = require('../models/user'),
      { generateToken } = require('../helpers/jwt'),
      { decrypt }       = require('../helpers/bcrypt');

class UserController {
    static register(req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(newUser => {
                res
                    .status(201)
                    .json(newUser);
            })
            .catch(err => {
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
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

    static login(req, res) {
        console.log(req.body)
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                console.log(foundUser)
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        })
                } else {
                    if (decrypt(req.body.password, foundUser.password)) {
                        const token = generateToken(foundUser._id, foundUser.name);
                        console.log('berhasil')
                        res
                            .status(200)
                            .json({ token: token });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            });
    };
};

module.exports = UserController;