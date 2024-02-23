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
    // finding if the day exists
    const day = Day.findOne({ where: { date: req.body.date } });
    let dayId;
    // if the day does not exist, create a new day
    if (!day || day == null) {
      const newDay = await Day.create({ date: req.body.date, user_id: userData.id });
      dayId = newDay.id;
    } else {
      dayId = day.id;
    }
    // create a new event
    const eventData = {
      event_name: req.body.event_name,
      event_time: req.body.event_time,
      event_location: req.body.event_location,
      event_length: req.body.event_length,
      day_id: dayId
    }

    const newEvent = await Event.create(eventData);
    res.status(200).json(newEvent);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
