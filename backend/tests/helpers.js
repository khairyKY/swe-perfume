const jwt = require('jsonwebtoken');
const User = require('../src/models/User');
const config = require('../src/config');

const createUser = async (overrides = {}) => {
  const timestamp = Date.now();
  const defaults = {
    email: `user-${timestamp}@test.local`,
    password: 'Password123!',
    name: 'Test User',
    role: 'user',
  };

  return User.create({ ...defaults, ...overrides });
};

const signToken = (user) =>
  jwt.sign({ id: user._id.toString(), role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

module.exports = { createUser, signToken };
