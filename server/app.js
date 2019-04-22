require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const app      = express();
const port     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const routes   = require('./routes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/e-commerce-' + NODE_ENV, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

module.exports = app;

app.listen(port, () => {
    console.log('App listening on: ' + port)
})