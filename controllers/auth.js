var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const { User } = require('../models');
const util = require('util');
const pbkdf2 = util.promisify(crypto.pbkdf2);

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    const userData = await User.findOne({where: {name: username} });
    if (!userData) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    const hashedPassword = await pbkdf2(password, userData.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(userData.hashed_password, 'hex'), hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, userData);
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(async function(id, done) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;