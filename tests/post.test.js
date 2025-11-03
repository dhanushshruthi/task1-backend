const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Post API', () => {
  let userId;
  let postId;

  beforeAll(async () => {
    // Create a test user
    const userRes = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'postUser' + Date.now(),
        email: `post${Date.now()}@example.com`,
        name: 'Post Test User',
        roles: ['user']
      });

    userId = userRes.body._id || userRes.body.user?._id;
  });

  it('should create a new post for the user', async () => {
    const res = await request(app)
      .post(`/api/v1/users/${userId}/posts`)
      .send({
        title: 'My First Post',
        content: 'This is the first test post.'
      });

    console.log(res.body);
    postId = res.body._id;
    expect(res.statusCode).toBe(201);
  });

  it('should get all posts for the user', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}/posts`);

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should soft delete the post', async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/${postId}`);

    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
