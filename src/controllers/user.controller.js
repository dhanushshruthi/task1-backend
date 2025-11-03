const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    await userService.softDeleteUser(req.params.id);
    res.json({ message: 'User soft deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.purgeUser = async (req, res) => {
  try {
    const msg = await userService.purgeUser(req.params.id);
    res.json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
