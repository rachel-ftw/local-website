var express = require('express');

var app = express();

// view engine setup
// app.set('view engine', 'pug');
app.use(express.static('public'));


module.exports = app;
