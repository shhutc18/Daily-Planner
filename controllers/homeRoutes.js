const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    // TODO: retrieve the user's data from the database
    // TODO: send the user's data to the homepage template
    // res.render('homepage');

    //HACK: temporarily sending the random user data to the homepage template
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
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Otherwise, send the login page
  res.render('login');
});

module.exports = router;
