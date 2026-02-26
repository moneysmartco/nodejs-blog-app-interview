const User = require('../models/User');

function listUsers(req, res, next) {
  try {
    const users = User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

function getUser(req, res, next) {
  try {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    if (User.findByEmail(email)) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // NOTE: In production, hash the password before storing it
    const user = User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

function updateUser(req, res, next) {
  try {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updated = User.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteUser(req, res, next) {
  try {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    User.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
