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
router.put('/user/:id', async function(req, res) {
  try {
    // Find the user to update
    const user = await User.findOne({ where: { id: req.params.id } });
    // 404 catch
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update the user
    user.set(req.body);
    // Save the updated user (triggering the beforeUpdate hook)
    const updatedUser = await user.save();
    // Respond with the updated user
    res.json(updatedUser);

  } catch (err) {
    res.status(500).json(err);
  }
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