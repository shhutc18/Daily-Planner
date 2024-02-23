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
    const userData = await User.findOne({where: {username: username} });
    if (!userData) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    // hashing password
    const hashedPassword = (await pbkdf2(password, userData.salt, 310000, 32, 'sha256')).toString('hex');
    //const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // comparing hashed password with db
    if (!crypto.timingSafeEqual(Buffer.from(userData.password, 'hex'), Buffer.from(hashedPassword, 'hex'))) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, userData);

  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(async function(username, done) {
  try {
    const user = await User.findByPk(username.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.get('/register', function(req, res, next) {
  res.render('registeruser');
});

router.post('/register', function(req, res, next) {
  
});

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;