const chai              = require('chai'),
      chaiHttp          = require('chai-http'),
      expect            = chai.expect,
      app               = require('../app'),
      clearCart         = require('../helpers/clearCart'),
      User              = require('../models/user'),
      Product           = require('../models/product'),
      { generateToken } = require('../helpers/jwt');
      
chai.use(chaiHttp);

let token = null;
let user_id = null;
let product_id = null;
let other_product_id = null;

before(function(done) {
    User
        .create({
            name: 'Budi',
            email: 'budi@email.com',
            password: 'asd'
        })
        .then(newUser => {
            token = generateToken(newUser._id, newUser.name)
            user_id = newUser._id
            return Product
                .create({
                name: 'Uno',
                price: 50000,
                stock: 10,
                description: 'Card game'
            })
        })
        .then(newProduct => {
            product_id = newProduct._id;
            return Product
                .create({
                name: 'Poker',
                price: 25000,
                stock: 10,
                description: 'Card game'
            })
        })
        .then(newProduct => {
            other_product_id = newProduct._id;
            done()
        })
        .catch(err => {
            console.log(err);
        });

    // clearCart(done);
});

after(function(done) {
    clearCart(done);
});

describe('Cart test', function() {

    let cart_id = null;

    describe.only('POST/ carts', function() {
        it('should send an object with status 201', function(done) {
            chai
                .request(app)
                .post('/carts')
                .set('token', token)
                .send({
                    item: [{
                        productId: product_id
                    }]   
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('buyer');
                    expect(res.body).to.have.property('item');
                    expect(res.body.item).to.be.an('Array');
                    expect(res.body.buyer).to.equal(String(user_id));
                    expect(res.body.item[0]).to.equal(String(product_id));

                    cart_id = res.body._id;

                    done();
                });
        });
    });

    describe.only('PUT/ carts/addItem', function() {
        it('should send an object with status 200', function(done) {
            chai
                .request(app)
                .put('/carts/addItem/' + other_product_id)
                .set('token', token)
                .send({
                    product_id: other_product_id
                })
                .end(function(err, res) {
                    console.log(res.body)
                    done()
                })
        })
    })

    describe.only('PUT/ carts/removeItem', function() {
        it('should send an object with status 200', function(done) {
            chai
                .request(app)
                .put('/carts/removeItem/' + other_product_id)
                .set('token', token)
                .send({
                    product_id: other_product_id
                })
                .end(function(err, res) {
                    console.log(res.body)
                    done()
                })
        })
    })

    describe.only('Get/ carts', function() {
        it('should send an object with status 200', function(done) {
            chai
                .request(app)
                .get('/carts')
                .set('token', token)
                .end(function(err, res) {
                    console.log(res.body)
                    done()
                })
        })
    })

    describe('DELETE/ carts', function() {
        it('should send an object with status code 200', function(done) {
            chai
                .request(app)
                .delete('/carts' + `/${cart_id}`)
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
});