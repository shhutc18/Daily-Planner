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

    console.log(req.body.date);

    let formattedDate = new Date(req.body.date);
    console.log(formattedDate);

    let day = await Day.findOne({
      where: {
        date: formattedDate,
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

    const newEvent = await Event.create({
      event_name: req.body.event_name,
      event_time: req.body.event_time,
      event_location: req.body.event_location,
      event_length: req.body.event_length,
      day_id: day.id
    });

    res.status(200).redirect('/');

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/new-task', async (req, res) => {
  try {
    const day = Day.findOne({
      where: { date: req.body.date, user_id: req.user.id}
    });
    let dayId;
    // if the day does not exist, create a new day
    if (!day || day == null) {
      const newDay = await Day.create({ date: req.body.date, user_id: userData.id });
      dayId = newDay.id;
      console.log("new day created");
    } else {
      dayId = day.id;
      console.log("day already exists");
    }
    // Create a new todo
    await Todo.create({
      task: req.body.task,
      completed: false,
      day_id: dayId,
      // Add other fields as necessary
    });

    // Redirect to the homepage
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to create a new task');
  }
});

router.post('/save-note', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/select-day', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.user;
    console.log(req.body);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
