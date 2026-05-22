const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const {
  listApplications,
  approveApplication,
  rejectApplication,
  removeProduct,
  listUsers,
  deleteUser,
} = require('../controllers/adminController');

const router = express.Router();
const objectId = Joi.string().hex().length(24);

router.get(
  '/applications',
  requireAuth,
  requireRole('admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
    }),
  }),
  listApplications,
);

router.put(
  '/applications/:id/approve',
  requireAuth,
  requireRole('admin'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
  }),
  approveApplication,
);

router.put(
  '/applications/:id/reject',
  requireAuth,
  requireRole('admin'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
  }),
  rejectApplication,
);

router.delete(
  '/products/:id',
  requireAuth,
  requireRole('admin'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
  }),
  removeProduct,
);

router.get('/users', requireAuth, requireRole('admin'), listUsers);

router.delete(
  '/users/:id',
  requireAuth,
  requireRole('admin'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
  }),
  deleteUser,
);

module.exports = router;
