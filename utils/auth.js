// Passport authentication

var express = require('express');
var router = express.Router();

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

router.get('/login', function(req, res, next) {
  res.render('login');
});

// Use the checkAuthenticated middleware on routes that require authentication
router.get('/protected-route', checkAuthenticated, function(req, res) {
  res.render('protected-route');
});

module.exports = router;