var express = require('express'),
  router = express.Router(),
  Cards = require('../models/cards'),
  cardsValidator = require('../middlewares/cards'),
  auth = require('../middlewares/auth')

router.route('/card')
  .post(auth.checker, auth.ifAdmin, cardsValidator.init, function (req, res) {
    // create a new instance of the Cards
    var card = new Cards(req.card)

    // save a Card and check for errors
    card.save((err, data) => {
      if (err)
        return res.send(err)

      res.status(201)
      res.json({ message: 'card added!', data: data })
    })
  })
  .get(auth.checker, function (req, res) {
    let query = {}
    if ( req.query.status ) query.status = req.query.status
    if ( req.query.karigor_id ) query.karigor_id = req.query.karigor_id
    Cards.find(query, function (err, data) {
      res.json(data.map(el => {
        return {
          id: el._id,
          karigor_id: el.karigor_id,
          title: el.title,
          description: el.description,
          images: el.images,
          attachments: el.attachments,
          issue_data: el.issue_data,
          occupy_date: el.occupy_date,
          allocated_time: el.allocated_time,
          comments: el.comments
        }
      }))
    })
    // res.json(req.query.status)
  })

module.exports = router