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
  try {
    // checking if username and password are not empty
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }

    // checking if user already exists
    User.findOne({where: {username: req.body.username}})
      .then(user => {
        if (user) {
          return res.status(400).json({ message: 'Username already exists' });
        }

        // creating user object
        const userData = {
          username: req.body.username,
          password: req.body.password,
          salt: crypto.randomBytes(16).toString('hex'),
        };
        
        // creating user in db
        User.create(userData, { fields: ['username', 'password', 'salt'] }, { hooks: true })
          .then(res.redirect('/login'))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;