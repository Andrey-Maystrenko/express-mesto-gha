const express = require('express');
// const res = require('express/lib/response');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserByID,
  // createUser,
  updateUserInfo,
  updateAvatar,
  userProfile,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), getUsers);

usersRoutes.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), userProfile);

usersRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), getUserByID);

// usersRoutes.post('/', createUser);

usersRoutes.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

usersRoutes.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), updateAvatar);

module.exports = {
  usersRoutes,
};
