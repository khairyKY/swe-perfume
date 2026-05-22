const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const {
  listProducts,
  getProductById,
} = require('../controllers/productController');

const router = express.Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number().integer().min(1).optional(),
      limit: Joi.number().integer().min(1).max(50).optional(),
    }),
  }),
  listProducts,
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  getProductById,
);

module.exports = router;
