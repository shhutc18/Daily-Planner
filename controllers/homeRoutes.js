const router = require('express').Router();
const ensureAuthenticated = require('../utils/auth');


router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const userData = {
      username: 'Test User'
    };

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let today = {
      day: day,
      month: month,
      year: year
    }

    res.render('homepage', { userData, today });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  // Otherwise, send the login page
  res.render('login');
});

module.exports = router;
