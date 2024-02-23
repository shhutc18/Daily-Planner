var express = require('express');
var router = express.Router();
var { Event } = require('../../models/index.js');


// GET request to get one Event model
router.get('/event/:id', function(req, res) {
 try {
    Event.findByPk(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// GET request to get all Event models
router.get('/events', function(req, res) {
 try {
    Event.findAll()
      .then(events => res.json(events))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// POST request to add an Event
router.post('/event', function(req, res) {
  try {
    Event.create(req.body)
      .then(newEvent => res.json(newEvent))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// PUT request to update an Event
router.put('/event/:id', function(req, res) {
 try {
    // Find the event to update
    Event.findByPk(req.params.id)
      .then(event => {
        // 404 catch
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        // Update the event
        event.set(req.body);
        // Save the updated event (triggering the beforeUpdate hook)
        event.save()
          .then(updatedEvent => res.json(updatedEvent))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// DELETE request to delete an Event
router.delete('/event/:id', function(req, res) {
 try {
    Event.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedEvent => res.json(deletedEvent))
    .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;