process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

//process.env.IP process.env.PORT
var db = mongoose();
var app = express(db);
app.listen(process.env.PORT);
module.exports = app;

console.log('server running');