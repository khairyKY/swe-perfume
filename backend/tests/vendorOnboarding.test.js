const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const { createUser, signToken } = require('./helpers');

describe('Vendor onboarding', () => {
  it('approves application and elevates user role', async () => {
    const user = await createUser({
      role: 'user',
      email: 'applicant@test.local',
    });
    const admin = await createUser({
      role: 'admin',
      email: 'admin@test.local',
    });

    const userToken = signToken(user);
    const adminToken = signToken(admin);

    const applyRes = await request(app)
      .post('/api/users/vendor-apply')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        brandName: 'My Brand',
        bio: 'About the brand',
      });

    expect(applyRes.status).toBe(201);

    const approveRes = await request(app)
      .put(`/api/admin/applications/${applyRes.body._id}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(approveRes.status).toBe(200);

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.role).toBe('vendor');
  });
});
