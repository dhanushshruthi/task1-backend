const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'dhanushshruthi' + Date.now(),
        email: `dhanush${Date.now()}@example.com`,
        name: 'Dhanushshruthi S T',
        roles: ['user']
      });

    console.log(res.body); // Optional: view backend response
    expect(res.statusCode).toBe(201);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
