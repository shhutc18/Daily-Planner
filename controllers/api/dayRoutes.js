var express = require('express');
var router = express.Router();
var { Day } = require('../../models/index.js');


// GET request to get one Day model
router.get('/day/:id', function(req, res) {
  Day.findByPk(req.params.id)
    .then(day => res.json(day))
    .catch(err => res.status(500).json(err));
});

// GET request to get all Day models
router.get('/days', function(req, res) {
  Day.findAll()
    .then(days => res.json(days))
    .catch(err => res.status(500).json(err));
});

// POST request to add a Day
router.post('/day', function(req, res) {
  Day.create(req.body)
    .then(newDay => res.json(newDay))
    .catch(err => res.status(500).json(err));
});

// PUT request to update a Day
router.put('/day/:id', function(req, res) {
  Day.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedDay => res.json(updatedDay))
  .catch(err => res.status(500).json(err));
});

// DELETE request to delete a Day
router.delete('/day/:id', function(req, res) {
  Day.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedDay => res.json(deletedDay))
  .catch(err => res.status(500).json(err));
});

module.exports = router;