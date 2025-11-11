const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const prefController = require('../controllers/preference.controller');
const postController = require('../controllers/post.controller');

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.get('/users/:id/details', userController.getUserDetails);
router.put('/users/:id', userController.updateUser);
router.put('/users/:id/status', userController.updateStatus); // ✅ new toggle status
router.delete('/users/:id', userController.softDeleteUser);    // ✅ enhanced soft delete
router.post('/users/:id/purge', userController.purgeUser);



// Preference routes
router.put('/users/:userId/preferences', prefController.upsertPreference);
router.get('/users/:userId/preferences', prefController.getPreference);

// Post routes
router.post('/users/:userId/posts', postController.createPost);
router.get('/users/:userId/posts', postController.getPostsByUser);
router.delete('/posts/:postId', postController.softDeletePost);

module.exports = router;
