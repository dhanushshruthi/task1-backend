const Post = require('../models/post.model');
const User = require('../models/user.model');

// Create Post
exports.createPost = async (userId, data) => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) throw new Error('User not found or deleted');
  const post = new Post({ ...data, userId });
  return await post.save();
};

// Get Posts by User
exports.getPostsByUser = async (userId) => {
  return await Post.find({ userId, isDeleted: false });
};

// Soft Delete Post
exports.softDeletePost = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  post.isDeleted = true;
  post.deletedAt = new Date();
  await post.save();
  return post;
};
