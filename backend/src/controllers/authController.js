const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const signToken = (user) =>
  jwt.sign({ id: user._id.toString(), role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const user = await User.create({ email, password, name });
    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login };
