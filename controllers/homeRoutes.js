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

module.exports = router;
