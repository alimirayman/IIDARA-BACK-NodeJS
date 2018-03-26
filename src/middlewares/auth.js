
var
  jwt = require('jsonwebtoken'),
  Karigor = require('../models/karigor')

var decryptToken = function (token) {
  try {
    var data = jwt.verify(token, (process.env.JWT_SECRECT || 'secrext'))
    return data
  } catch (err) {
    throw err
  }
}

var userID = function (token) {
  return decryptToken(token).user_id
}

var authentication = function (req, res, next) {
  var auth = req.headers.authorization
  if (!auth) {
    res.status(403)
    res.json({
      message: "You are not an authentic user Sir!!!"
    })
    return
  }
  try {
    var token = auth.split(' ')[1]
    var user_id = userID(token)
    req.user_id = user_id

  } catch (err) {
    res.status(403)
    res.json({
      message: "You are not an authentic user Sir!!!"
    })
  }

  next()
}

var adminChecker = function (req, res, next) {
  Karigor.findById(req.user_id, function (err, karigor) {
    if (err) {
      res.status(401)
      res.json({
        message: "You don't have the permission Sir!!!"
      })
    }
    
    next()
  })
}

module.exports.checker = authentication
module.exports.ifAdmin = adminChecker