// Bsic Setup

// Importing Moules
var 
  express = require('express'),
  app = express(),
  cors = require('cors'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config()

// Import Routes
var
  index = require('./src/routes'),
  karigor = require('./src/routes/karigor'),
  card = require('./src/routes/cards'),
  auth = require('./src/routes/auth')

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
mongoose.connect('mongodb://localhost:27017/iidara');

// set our port
var port = process.env.PORT || 8080


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var version = 1
app.use(`/api/v${version}`, index);
app.use(`/api/v${version}`, karigor);
app.use(`/api/v${version}`, card);
app.use(`/api/v${version}`, auth);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);