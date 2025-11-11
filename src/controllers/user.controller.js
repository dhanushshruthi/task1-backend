const User = require('../models/user.model');

// ✅ Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // fetch all users from MongoDB
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get one user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Soft delete user
exports.softDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() });
    res.status(200).json({ message: 'User soft deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Hard delete user (purge)
exports.purgeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Preference = require('../models/preference.model');
const Post = require('../models/post.model');

// ✅ Get complete user details (with posts + preferences)
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1️⃣ Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2️⃣ Find preferences and posts related to that user
    const preferences = await Preference.findOne({ userId });
    const posts = await Post.find({ userId, isDeleted: false });

    // 3️⃣ Combine and send all data
    res.status(200).json({
      user,
      preferences: preferences || {},
      posts: posts || [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ Toggle user active/inactive status
exports.updateStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = !user.isActive; // toggle status
    await user.save();

    res.status(200).json({
      message: `User status updated to ${user.isActive ? 'active' : 'inactive'}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

