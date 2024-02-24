const router = require('express').Router();
const ensureAuthenticated = require('../utils/auth');
const { Day, Event, Todo, User } = require('../models');
const e = require('express');

// GET / - loads the homepage
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    // Getting the user data from the session
    let userData = req.user;
    userData = userData.get({ plain: true });

    // Creating the date object for today
    let date;
    if (req.query.day) {
      // If the day is specified in the query, use that day
      const parts = req.query.day.split('-');
      // Months are 0-indexed in JavaScript dates, so we need to subtract 1 from the month
      date = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      date = new Date();
    }
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
    events = events.map(event => event.get({ plain: true }));

    // searching for the todos in the database
    let todos = await Todo.findAll({
      where: {
        day_id: day.id
      }
    });
    todos = todos.map(todo => todo.get({ plain: true }));

    console.log(userData);

    // render the homepage
    res.render('homepage', { userData, today, formattedDate, day, events, todos});

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /event - loads the event page
router.get('/event', ensureAuthenticated, async (req, res) => {
  try {
    const userData = req.session.passport.user;

    res.render('event', { userData });

  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /event - creates a new event
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

// POST /new-todo - creates a new todo
router.post('/new-todo', async (req, res) => {
  console.log(req.body);
  try {
    // find the day
    const day = await Day.findOne({
      where: { date: new Date(req.body.todoDay), user_id: req.user.id}
    });

    // 404 if day not found
    if (!day) {
      res.status(404).json({ message: 'There was an error creating the todo: day not found' });
      return;
    }

    // Create a new todo
    await Todo.create({
      todo_name: req.body.todo_name,
      completed: false,
      day_id: day.id
    });

    res.status(200).redirect('/?day=' + req.body.todoDay);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/update-todos', async (req, res) => {
  try {
    // Get the ids of the completed todos
    const completedTodos = req.body.completedTodos;

    // Delete the completed todos from the database
    await Todo.destroy({
      where: {
        id: completedTodos
      }
    });

    // Redirect to the homepage
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to delete the todos');
  }
});

// POST /save-note - saves the note property
router.post('/save-note', ensureAuthenticated, async (req, res) => {
  try {
    console.log(req.body.note);
    let userData = req.user;
    userData.notes = req.body.note;
    await User.update(userData, {
      where: {
        id: userData.id
      }
    });
    await userData.save();
    res.status(200).redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
