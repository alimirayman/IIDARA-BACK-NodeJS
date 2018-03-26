var
  express = require('express'),
  router = express.Router(),
  Karigor = require('../models/karigor'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken')

router.route('/login')
  .post(function(req, res) {
    Karigor.findOne({
      email: req.body.email
    }, function (err, karigor) {
      if(err)
        res.send(err)

      if (req.body.password) {
        var checked = bcrypt.compareSync(req.body.password, karigor.password)
        if (checked){
          var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
              user_id: karigor._id
            }
          }, (process.env.JWT_SECRECT || 'secrext'))
          res.json({
            id: karigor._id,
            is_admin: karigor.is_admin,
            token: token,
            level: karigor.level,
            email: karigor.email,
            name: karigor.name,
            username: karigor.username,
            role: karigor.role,
            avatar: karigor.avatar
          })

        }
        else {
          res.status(403)
          res.json({ message: "You are not an authentic user Sir!!!" })
        }
      }
      else{
        res.status(403)
        res.json({ message: "Please Type your password"})
      }
    })
  })

module.exports = router

