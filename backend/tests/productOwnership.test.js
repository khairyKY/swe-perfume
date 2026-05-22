const request = require('supertest');
const app = require('../src/app');
const Product = require('../src/models/Product');
const { createUser, signToken } = require('./helpers');

describe('Vendor product ownership', () => {
  it("prevents updating another vendor's product", async () => {
    const vendorA = await createUser({
      role: 'vendor',
      email: 'vendor-a@test.local',
    });
    const vendorB = await createUser({
      role: 'vendor',
      email: 'vendor-b@test.local',
    });

    const product = await Product.create({
      vendorId: vendorA._id,
      name: 'Item',
      description: 'Item description',
      price: 20,
      isActive: true,
    });

    const token = signToken(vendorB);

    const res = await request(app)
      .put(`/api/vendor/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated',
      });

    expect(res.status).toBe(404);
  });
});
