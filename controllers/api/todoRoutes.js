var express = require('express');
var router = express.Router();
var { Todo } = require('../../models/index.js');

// GET request to get one Todo model
router.get('/todo/:id', function(req, res) {
 try {
    Todo.findByPk(req.params.id)
      .then(todo => res.json(todo))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// GET request to get all Todo models
router.get('/todos', function(req, res) {
  try {
    Todo.findAll()
      .then(todos => res.json(todos))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// POST request to add a Todo
router.post('/todo', function(req, res) {
 try {
    Todo.create(req.body)
      .then(newTodo => res.json(newTodo))
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// PUT request to update a Todo
router.put('/todo/:id', function(req, res) {
 try {
    // Find the todo to update
    Todo.findByPk(req.params.id)
      .then(todo => {
        // 404 catch
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        // Update the todo
        todo.set(req.body);
        // Save the updated todo (triggering the beforeUpdate hook)
        todo.save()
          .then(updatedTodo => res.json(updatedTodo))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// DELETE request to delete a Todo
router.delete('/todo/:id', function(req, res) {
  try {
    Todo.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedTodo => res.json(deletedTodo))
    .catch(err => res.status(500).json(err));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;