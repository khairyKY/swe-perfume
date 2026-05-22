const request = require('supertest');
const app = require('../src/app');
const { createUser, signToken } = require('./helpers');

describe('RBAC', () => {
  it('blocks non-vendors from vendor routes', async () => {
    const user = await createUser({ role: 'user' });
    const token = signToken(user);

    const res = await request(app)
      .post('/api/vendor/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sample',
        description: 'Sample description',
        price: 10,
      });

    expect(res.status).toBe(403);
  });
});
