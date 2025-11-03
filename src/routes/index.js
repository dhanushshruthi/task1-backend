const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const prefController = require('../controllers/preference.controller');
const postController = require('../controllers/post.controller');

// User routes
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.softDeleteUser);
router.post('/users/:id/purge', userController.purgeUser);

// Preference routes
router.put('/users/:userId/preferences', prefController.upsertPreference);
router.get('/users/:userId/preferences', prefController.getPreference);

// Post routes
router.post('/users/:userId/posts', postController.createPost);
router.get('/users/:userId/posts', postController.getPostsByUser);
router.delete('/posts/:postId', postController.softDeletePost);

module.exports = router;
