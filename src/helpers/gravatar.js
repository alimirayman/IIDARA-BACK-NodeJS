var md5 = require('blueimp-md5')

var gravatar = function (email, size) {
  var gravatarRoot = 'https://www.gravatar.com/'
  var avatar = gravatarRoot + 'avatar'
  var hash = md5(email)

  return `${avatar}/${hash}?s=${size}`
}

module.exports = gravatar