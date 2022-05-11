const express = require('express');
const {
  getUsers,
  getUserByID,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', getUserByID);

usersRoutes.post('/', express.json(), createUser);

usersRoutes.patch('/me', express.json(), updateUserInfo);

usersRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports = {
  usersRoutes,
};
