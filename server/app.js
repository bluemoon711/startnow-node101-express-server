// import files and packages up here
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var data = require('./data.json');
var uuid = require('node-uuid');
morgan.token('id', function getId (req) {
    return req.id;
});

// create your express server below
var app = express();
app.use(assignId);
app.use(morgan(':method :url :response-time'));
app.use(bodyParser.json());

// add your routes and middleware below
app.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).end('It is working');
});

function assignId (req, res, next) {
    req.id = uuid.v4();
    next();
}

app.get('/data', function(req, res) {
    res.json(data);
});

// finally export the express application
module.exports = app;
