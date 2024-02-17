// Passport authentication

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const { User } = require('../models');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  const userData = User.findOne({where: {name: username} });
  try {
    if (!userData) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, userData.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(userData.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, userData);
    });
  } catch (err) {
    return cb(err);
  }
}));

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;