const chai              = require('chai'),
      chaiHttp          = require('chai-http'),
      expect            = chai.expect,
      app               = require('../app'),
      clearProduct      = require('../helpers/clearProduct'),
      User              = require('../models/user'),
      { generateToken } = require('../helpers/jwt');
      
chai.use(chaiHttp);

let token = null;

before(function(done) {
    User
        .create({
            name: 'Rido',
            email: 'rido@email.com',
            password: 'asd'
        })
        .then(newUser => {
            token = generateToken(newUser._id, newUser.name)
        })
        .catch(err => {
            console.log(err);
        });

    clearProduct(done);
});

after(function(done) {
    clearProduct(done);
});


describe('Product test', function() {

    let _id = null;

    const newProduct = {
        name: 'Uno',
        price: 50000,
        stock: 10,
        description: 'Card game'
    };

    describe('POST/ products', function() {
        it('should send an object with status code 201', function(done) {
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send(newProduct)
                .end(function(err, res) {
                    _id = res.body._id;

                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body.name).to.equal(newProduct.name);
                    expect(res.body.price).to.equal(newProduct.price);
                    expect(res.body.description).to.equal(newProduct.description);
                    done();
                });
        });
    });

    describe('POST/ products - Empty description', function() {
        it('should send an error validation message with status code 403', function(done) {
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Uno',
                    price: 50000,
                    stock: 10,
                    description: ''
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Product validation failed: description: Product description required');
                    done();
                });
        });
    });

    describe('POST/ products - Empty price', function() {
        it('should send an error validation message with status code 403', function(done) {
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Uno',
                    price: '',
                    stock: 10,
                    description: 'Card game'
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Product validation failed: price: Product price required');
                    done();
                });
        });
    });


    describe('POST/ products - Empty name', function() {
        it('should send an error validation message with status code 403', function(done) {
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: '',
                    price: 50000,
                    stock: 10,
                    description: 'Card game'
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Product validation failed: name: Product name required');
                    done();
                });
        });
    });


    describe('POST/ products - Without access token', function() {
        it('should send an error validation message with status code 401', function(done) {
            chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Login first');
                    done();
                });
        });
    });

    describe('GET/ products', function() {
        it('should send an array of objects with status code 200', function(done) {
            chai
                .request(app)
                .get('/products')
                .set('token', token)
                .end(function(err, res) {
                    console.log(res.body)
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('description');
                    expect(res.body[0]).to.have.property('image');
                    expect(res.body[0].name).to.equal(newProduct.name);
                    expect(res.body[0].price).to.equal(newProduct.price);
                    expect(res.body[0].description).to.equal(newProduct.description);
                    done();
                });
        });
    });


    describe('GET/ products - Without access token', function() {
        it('should send an array of objects with status code 401', function(done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Login first');
                    done();
                });
        });
    });

    describe('PUT/ products - Success change the value', function() {
        it('should send an object with status code 200', function(done) {
            chai
                .request(app)
                .put('/products' + `/${_id}`)
                .set('token', token)
                .send({
                    stock: 12
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body.n).to.equal(1);
                    expect(res.body.ok).to.equal(1);
                    expect(res.body.nModified).to.equal(1);
                    done();
                });
        });
    });

    describe('PUT/ products - Success without change the value', function() {
        it('should send an object with status code 200', function(done) {
            chai
                .request(app)
                .put('/products' + `/${_id}`)
                .set('token', token)
                .send({
                    stock: 12
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body.n).to.equal(1);
                    expect(res.body.ok).to.equal(1);
                    expect(res.body.nModified).to.equal(0);
                    done();
                });
        });
    });


    describe('PUT/ products - Without access token', function() {
        it('should send an object with status code 401', function(done) {
            chai
                .request(app)
                .put('/products' + `/${_id}`)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Login first');
                    done();
                });
        });
    });

    describe('DELETE/ products - Success', function() {
        it('should send an object with status code 200', function(done) {
            chai
                .request(app)
                .delete('/products' + `/${_id}`)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body.n).to.equal(1);
                    expect(res.body.ok).to.equal(1);
                    expect(res.body.deletedCount).to.equal(1);
                    done();
                });
        });
    });


    describe.skip('DELETE/ products - Without access token', function() {
        it('should send an object with status code 401', function(done) {
            chai
                .request(app)
                .delete('/products' + `/${_id}`)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Login first');
                    done();
                });
        });
    });

    describe('DELETE/ products - Id is not valid', function() {
        it('should send an object with status code 400', function(done) {
            const random_id = '1231456'

            chai
                .request(app)
                .delete('/products' + `/${random_id}`)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal(`Cast to ObjectId failed for value "${random_id}" at path "_id" for model "Product"`);
                    done();
                });
        });
    });

    
});