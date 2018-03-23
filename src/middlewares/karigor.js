var
  isEmail = require('validator/lib/isEmail'),
  // isURL = require('validator/lib/isURL'),
  // isAlpha = require('validator/lib/isAlpha'),
  // isAlphanumeric = require('validator/lib/isAlphanumeric'),
  isNumeric = require('validator/lib/isNumeric'),
  bcrypt = require('bcrypt'),
  gravatar = require('../helpers/gravatar')

var karigorModelInit = function (req, res, next) {
  var karigor = req.body
  req.karigor = {
    username: karigor.username,
    name: karigor.name,
    email: isEmail(karigor.email) ? karigor.email : null,
    password: bcrypt.hashSync(karigor.password, 12),
    phone: isNumeric(karigor.phone) ? karigor.phone : null,
    address: karigor.address,
    role: karigor.role,
    avatar: (karigor.avatar) ? karigor.avatar : gravatar(karigor.email, 400),
    level: isNumeric(karigor.level) ? karigor.level : null,
    is_admin: false
  }

  next()
}

var karigorModelUpdate = function (req, res, next) {
  var karigor = req.body
  req.karigor = {
    name: karigor.name,
    phone: isNumeric(karigor.phone) ? karigor.phone : null,
    address: karigor.address,
    role: karigor.role,
    avatar: (karigor.avatar) ? karigor.avatar : gravatar(karigor.email),
    level: isNumeric(karigor.level) ? karigor.level : null
  }

  next()
}

module.exports.init = karigorModelInit
module.exports.update = karigorModelUpdate