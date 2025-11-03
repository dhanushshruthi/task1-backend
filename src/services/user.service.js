const User = require('../models/user.model');
const Post = require('../models/post.model');
const Preference = require('../models/preference.model');

// Create User
exports.createUser = async (data) => {
  const existing = await User.findOne({ username: data.username });
  if (existing) throw new Error('User already exists');
  const user = new User(data);
  return await user.save();
};

// Get User
exports.getUserById = async (id) => {
  return await User.findOne({ _id: id, isDeleted: false });
};

// Update User
exports.updateUser = async (id, updateData) => {
  const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, { new: true });
  if (!user) throw new Error('User not found or deleted');
  return user;
};

// Soft Delete
exports.softDeleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  user.isDeleted = true;
  user.deletedAt = new Date();
  await Post.updateMany({ userId: id }, { isDeleted: true, deletedAt: new Date() });
  await user.save();
  return user;
};

// Hard Delete (Purge)
exports.purgeUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  if (!user.isDeleted) throw new Error('User must be soft deleted first');

  // Optional: add grace period logic here
  await Post.deleteMany({ userId: id });
  await Preference.deleteMany({ userId: id });
  await User.deleteOne({ _id: id });
  return { message: 'User purged successfully' };
};
