var
  isNumeric = require('validator/lib/isNumeric')

var cardModelInit = function (req, res, next) {
  var card = req.body
  req.card = {
    title: card.title,
    description: card.description,
    images: card.images,
    attachments: card.attachments,
    karigor_id: card.karigor_id,
    status: (card.karigor_id) ? 1 : 0,
    issue_data: card.issue_data,
    occupy_date: card.occupy_date,
    allocated_time: card.allocated_time,
    points: (card.points) ? isNumeric(card.points) ? card.points : 1 : 1
  }

  next()
}

var cardModelUpdate = function (req, res, next) {
  var card = req.body
  req.card = {
    title: card.title,
    description: card.description,
    images: card.images,
    attachments: card.attachments,
    karigor_id: card.karigor_id,
    issue_data: card.issue_data,
    occupy_date: card.occupy_date,
    allocated_time: card.allocated_time
  }

  next()
}

var changeStatus = function (req, res, next) {
  
}

module.exports.init = cardModelInit
module.exports.update = cardModelUpdate