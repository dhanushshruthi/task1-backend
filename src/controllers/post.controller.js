const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.params.userId, req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await postService.getPostsByUser(req.params.userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.softDeletePost = async (req, res) => {
  try {
    const post = await postService.softDeletePost(req.params.postId);
    res.json({ message: 'Post soft deleted', post });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
