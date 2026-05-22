const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(2).required(),
    }),
  }),
  register,
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = router;
