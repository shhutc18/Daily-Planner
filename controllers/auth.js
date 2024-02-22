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
    // fetching user from db
    const userData = await User.findOne({where: {name: username} });
    if (!userData) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    // hashing password
    const hashedPassword = (await pbkdf2(password, userData.salt, 310000, 32, 'sha256')).toString('hex');
    //const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // comparing hashed password with db
    if (!crypto.timingSafeEqual(Buffer.from(userData.password, 'hex'), hashedPassword)) {
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
  failureRedirect: '/login',
  failureMessage: true
}));

module.exports = router;