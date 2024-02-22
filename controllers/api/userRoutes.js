var express = require('express');
var router = express.Router();
var { User } = require('../../models/index.js');

// GET request to get one User model
router.get('/user/:id', function(req, res) {
  User.findByPk(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// GET request to get all User models
router.get('/users', function(req, res) {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// POST request to add a User
router.post('/user', function(req, res) {
  User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => res.status(500).json(err));
});

// PUT request to update a User
router.put('/user/:id', function(req, res) {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedUser => res.json(updatedUser))
  .catch(err => res.status(500).json(err));
});

// DELETE request to delete a User
router.delete('/user/:id', function(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedUser => res.json(deletedUser))
  .catch(err => res.status(500).json(err));
});

module.exports = router;