var express = require('express'),
  router = express.Router(),
  cards = require('../models/cards'),
  auth = require('../middlewares/auth')

router.route('/card')
  .post(function (req, res) {
    
  })
  .get(function (req, res) {
    cards.find({
      status: req.query.status
    }, function (err, data) {
      res.json(data)
    })
    // res.json(req.query.status)
  })

module.exports = router