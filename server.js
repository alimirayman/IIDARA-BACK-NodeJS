// Bsic Setup

// Importing Moules
var express = require('express'),
    app = express(),
    cors = require('cors'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

var index = require('./src/routes')
var people = require('./src/routes/people')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Configre App to use cors
app.use(cors())

// Configure App to use Helmet for Security
app.use(helmet())

// Database Setup
mongoose.connect('mongodb://localhost:27017/person');

// set our port
var port = process.env.PORT || 8080


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', index);
app.use('/api', people);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);