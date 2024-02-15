const router = require('express').Router();
const checkAuthenticated = require('../utils/auth');

router.get('/', checkAuthenticated, async (req, res) => {
  try {
    // retrieve the user's data from the database
    // send the user's data to the homepage template
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Otherwise, send the login page
  res.render('login');
});

module.exports = router;
