var express = require('express'),
  router = express.Router()

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log(`url: ${req.url}, method: ${req.method}, ip: ${req.ip}`)
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

module.exports = router