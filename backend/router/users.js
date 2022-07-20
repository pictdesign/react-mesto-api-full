const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getMe, updateUser, updateAvatar, logout,
} = require('../controllers/users');
const { validateUrl } = require('../utils/utils');

const router = express.Router();

router.get('/signout', logout);

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:id', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl, 'validate'),
  }),
}), updateAvatar);

module.exports = router;
