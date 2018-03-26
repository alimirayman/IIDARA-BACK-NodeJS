var express = require('express'),
  router = express.Router(),
  Karigor = require('../models/karigor'),
  karigorValidate = require('../middlewares/karigor'),
  auth = require('../middlewares/auth')

// ROUTES FOR OUR API Karigor
// =============================================================================
router.route('/karigor')
  // create a karigor (accessed at POST http://localhost:8080/api/karigor)
  .post(auth.checker, auth.ifAdmin, karigorValidate.init, function (req, res) {
    
    var person = new Karigor(req.karigor)                                 // create a new instance of the Person model
    
    // save a karigor and check for errors
    person.save(function (err) {
      if (err)
        return res.send(err)

      res.status(201)
      res.json({ message: 'karigor added!' })
    })

  })
  .get(auth.checker, function (req, res) {
    Karigor.find(function (err, karigor) {
      if (err)
        res.send(err);
      
      var karigorFiltered = karigor.map(el => {
        return {
          id: el._id,
          username: el.username,
          name: el.name,
          email: el.email,
          phone: el.phone,
          address: el.address,
          role: el.role,
          avatar: el.avatar,
          level: el.level,
        }
      })

      res.json(karigorFiltered)
    })
  })

router.route('/karigor/:id')
  // update a karigor (accessed at POST http://localhost:8080/api/karigor)
  .put(karigorValidate.update, function (req, res) {

    Karigor.findById(req.params.id, function (err, karigor) {
      if (err)
        res.send(err)

      karigor.name = req.karigor.name
      karigor.phone = req.karigor.phone
      karigor.address = req.karigor.address
      karigor.role = req.karigor.role
      karigor.avatar = req.karigor.avatar
      karigor.level = req.karigor.level
      
      karigor.save(function (err) {
        if (err)
          res.send(err)

        res.json({ message: 'karigor updated!' })
      })
    })

  })
  // Get single Karigor
  .get(function (req, res) {
    Karigor.findById(req.params.id, function (err, karigor) {
      if (err)
        res.send(err);

      var karigorFiltered = {
          id: karigor._id,
          username: karigor.username,
          name: karigor.name,
          email: karigor.email,
          phone: karigor.phone,
          address: karigor.address,
          role: karigor.role,
          avatar: karigor.avatar,
          level: karigor.level,
          is_admin: karigor.is_admin,
        }

      res.json(karigorFiltered);
    })
  })
  // Delete Karigor by ID
  .delete(function (req, res) {

    Karigor.remove({
      _id: req.params.id
    }, function (err) {
      if (err)
        res.send(err)

      res.json({ message: 'karigor deleted!' })
    })

  })

module.exports = router