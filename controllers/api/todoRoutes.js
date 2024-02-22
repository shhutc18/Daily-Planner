var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

// GET request to get one Todo model
router.get('/todo/:id', function(req, res) {
  Todo.findByPk(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(500).json(err));
});

// GET request to get all Todo models
router.get('/todos', function(req, res) {
  Todo.findAll()
    .then(todos => res.json(todos))
    .catch(err => res.status(500).json(err));
});

// POST request to add a Todo
router.post('/todo', function(req, res) {
  Todo.create(req.body)
    .then(newTodo => res.json(newTodo))
    .catch(err => res.status(500).json(err));
});

// PUT request to update a Todo
router.put('/todo/:id', function(req, res) {
  Todo.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedTodo => res.json(updatedTodo))
  .catch(err => res.status(500).json(err));
});

// DELETE request to delete a Todo
router.delete('/todo/:id', function(req, res) {
  Todo.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedTodo => res.json(deletedTodo))
  .catch(err => res.status(500).json(err));
});

module.exports = router;