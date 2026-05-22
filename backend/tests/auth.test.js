const request = require('supertest');
const app = require('../src/app');

describe('Auth', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'newuser@test.local',
      password: 'Password123!',
      name: 'New User',
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('newuser@test.local');
  });

  it('logs in with valid credentials', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'login@test.local',
      password: 'Password123!',
      name: 'Login User',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'login@test.local',
      password: 'Password123!',
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
