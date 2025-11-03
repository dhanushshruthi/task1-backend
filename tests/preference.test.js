const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Preference API', () => {
  let userId;

  beforeAll(async () => {
    // First create a test user to attach preferences to
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'prefUser' + Date.now(),
        email: `pref${Date.now()}@example.com`,
        name: 'Preference Test User',
        roles: ['user']
      });

    userId = res.body._id || res.body.user?._id;
  });

  it('should create or update user preferences', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}/preferences`)
      .send({
        settings: {
          theme: 'dark',
          notifications: true
        }
      });

    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });

  it('should get user preferences', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}/preferences`);

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('settings');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
