
var
  jwt = require('jsonwebtoken')

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

module.exports.checker = authentication