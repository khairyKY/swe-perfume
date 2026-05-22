const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
