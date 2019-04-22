const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      clearUser = require('../helpers/clearUser');

chai.use(chaiHttp);

before(function (done) {
    clearUser(done);
});

after(function (done) {
    clearUser(done);
});

describe('User test', function () {

    let _id = null;

    let newUser = {
        name: 'Rido',
        email: 'rido@email.com',
        password: 'asd'
    }

    describe('POST/ users/register - Success', function () {
        it('should send an object with status code 201', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    _id = res.body._id;

                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body.name).to.equal(newUser.name);
                    expect(res.body.email).to.equal(newUser.email);
                    expect(res.body.password).to.not.equal(newUser.password);
                    done();
                });
        });
    });

    describe('POST/ users/register - Password required', function () {
        it('should send an password validation error message with status code 403', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send({
                    name: newUser.name,
                    email: newUser.email,
                    password: ''
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: password: User password required');
                    done();
                });
        });
    });

    describe('POST/ users/register - Email required', function () {
        it('should send an email validation error message with status code 403', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send({
                    name: newUser.name,
                    email: '',
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: email: User email required');
                    done();
                });
        });
    });


    describe('POST/ users/register - Name required', function () {
        it('should send an name validation error message with status code 403', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send({
                    name: '',
                    email: newUser.email,
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: name: User name required');
                    done();
                });
        });
    });

    describe('POST/ users/register - Email not valid', function () {
        it('should send an email validation error message with status code 403', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send({
                    name: newUser.name,
                    email: 'rido@em',
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: email: rido@em is not a valid email!');
                    done();
                });
        });
    });

    describe('POST/ users/register - Email has been taken', function () {
        it('should send an email validation error message with status code 409', function (done) {
            chai
                .request(app)
                .post('/users/register')
                .send({
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(409);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Email has been taken');
                    done();
                });
        });
    });

    describe('POST/ users/login - Success', function () {
        it('should send a string of access token with status code 200', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: newUser.email,
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token')
                    done();
                });
        });
    });

    describe('POST/ users/login - Wrong password', function () {
        it('should send an error message with status code 401', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: newUser.email,
                    password: ''
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Wrong password');
                    done();
                });
        });
    });


    describe('POST/ users/login - User not found', function () {
        it('should send an error message with status code 404', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: '',
                    password: newUser.password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User not found');
                    done();
                });
        });
    });
});