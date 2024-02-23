var express = require('express');
var router = express.Router();
var { Day } = require('../../models/index.js');


// GET request to get one Day model
router.get('/day/:id', function(req, res) {
 try {
   Day.findByPk(req.params.id)
     .then(day => res.json(day))
     .catch(err => res.status(500).json(err));
 }
  catch (err) {
    res.status(500).json(err);
  }
});

// GET request to get all Day models
router.get('/days', function(req, res) {
  try {
    Day.findAll()
      .then(days => res.json(days))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// POST request to add a Day
router.post('/day', function(req, res) {
  try {
    Day.create(req.body)
      .then(newDay => res.json(newDay))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// PUT request to update a Day
router.put('/day/:id', function(req, res) {
 try {
   Day.findOne({ where: { id: req.params.id } })
     .then(day => {
       day.set(req.body);
       day.save()
         .then(updatedDay => res.json(updatedDay))
         .catch(err => res.status(500).json(err));
     })
     .catch(err => res.status(500).json(err));
 }
  catch (err) {
    res.status(500).json(err);
  }
});

// DELETE request to delete a Day
router.delete('/day/:id', function(req, res) {
  try {
    Day.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedDay => res.json(deletedDay))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;