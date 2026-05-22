const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const upload = require('../middleware/upload');
const {
  createProduct,
  createProductsBulk,
  updateProduct,
  deleteProduct,
  listVendorOrders,
  updateOrderStatus,
} = require('../controllers/vendorController');

const router = express.Router();

const objectId = Joi.string().hex().length(24);

router.post(
  '/products',
  requireAuth,
  requireRole('vendor'),
  upload.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).required(),
      description: Joi.string().min(5).required(),
      price: Joi.number().min(0).required(),
      imageUrl: Joi.string().uri().optional(),
    }),
  }),
  createProduct,
);

router.post(
  '/products/bulk',
  requireAuth,
  requireRole('vendor'),
  celebrate({
    [Segments.BODY]: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().min(2).required(),
            description: Joi.string().min(5).required(),
            price: Joi.number().min(0).required(),
            imageUrl: Joi.string().uri().optional(),
          }),
        )
        .min(1)
        .max(100)
        .required(),
    }),
  }),
  createProductsBulk,
);

router.put(
  '/products/:id',
  requireAuth,
  requireRole('vendor', 'admin'),
  upload.single('image'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).optional(),
      description: Joi.string().min(5).optional(),
      price: Joi.number().min(0).optional(),
      isActive: Joi.boolean().optional(),
      imageUrl: Joi.string().uri().optional(),
    }).min(1),
  }),
  updateProduct,
);

router.delete(
  '/products/:id',
  requireAuth,
  requireRole('vendor', 'admin'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
  }),
  deleteProduct,
);

router.get('/orders', requireAuth, requireRole('vendor'), listVendorOrders);

router.put(
  '/orders/:id/status',
  requireAuth,
  requireRole('vendor'),
  celebrate({
    [Segments.PARAMS]: Joi.object({ id: objectId.required() }),
    [Segments.BODY]: Joi.object({
      status: Joi.string()
        .valid('pending', 'processing', 'shipped', 'delivered')
        .required(),
    }),
  }),
  updateOrderStatus,
);

module.exports = router;
