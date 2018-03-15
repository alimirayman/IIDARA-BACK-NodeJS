var express = require('express'),
    router = express.Router()
    Person = require('../models/person')

// ROUTES FOR OUR API Public
// =============================================================================
router.route('/people')
  // create a person (accessed at POST http://localhost:8080/api/person)
  .post(function (req, res) {

    var person = new Person();        // create a new instance of the Person model
    person.name = req.body.name;      // set the persons name (comes from the request)
    person.email = req.body.email;    // set the persons email (comes from the request)

    // save the bear and check for errors
    person.save(function (err) {
      if (err)
        res.send(err);

      res.json({ message: '1 person added!' });
    });

  })
  .get(function (req, res) {
    Person.find(function (err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    })
  })

module.exports = router