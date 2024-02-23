const router = require('express').Router();
const ensureAuthenticated = require('../utils/auth');


router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.session.passport.user;

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

router.get('/event', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.session.passport.user;

    res.render('event', { userData });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/event', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.session.passport.user;
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
