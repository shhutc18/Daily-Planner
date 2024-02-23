const router = require('express').Router();
const ensureAuthenticated = require('../utils/auth');
const { Day, Event, Todo, User } = require('../models');
const e = require('express');

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    // Getting the user data from the session
    const userData = req.session.passport.user;

    // Creating the date object for today
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let today = {
      day: date.getDate(),
      month: month,
      year: date.getFullYear()
    }

    // formatting the date to match the date in the database
    let formattedDate = `${today.year}-${today.month}-${today.day}`;

    // searching for the day in the database
    let day = await Day.findOne({
      where: {
        date: new Date(formattedDate),
        user_id: userData.id
      }
    });
    // If the day does not exist, create a new day
    if (day == null) {
      console.log("day does not exist");
      const newDay = await Day.create({
        date: formattedDate,
        user_id: userData.id
      });
      day = newDay;
    }

    // searching for the events in the database
    let events = await Event.findAll({
      where: {
        day_id: day.id
      }
    });

    // searching for the todos in the database
    let todos = await Todo.findAll({
      where: {
        day_id: day.id
      }
    });

    // render the homepage
    res.render('homepage', { userData, today, formattedDate, day, events, todos});

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
