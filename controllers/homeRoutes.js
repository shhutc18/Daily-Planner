const router = require('express').Router();
const ensureAuthenticated = require('../utils/auth');
const { Day, Event, Todo, User } = require('../models');
const e = require('express');


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
    const userData = req.user;

    let day = await Day.findOne({
      where: {
        date: req.body.date,
        user_id: userData.id
      }
    });

    if (day == null) {
      const newDay = await Day.create({
        date: req.body.date,
        user_id: userData.id
      });
      day = newDay;
    }


    res.status(200).json(day);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
