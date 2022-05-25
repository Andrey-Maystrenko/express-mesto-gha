const express = require('express');
// const res = require('express/lib/response');
const {
  getUsers,
  getUserByID,
  // createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', getUserByID);

// usersRoutes.post('/', createUser);

// usersRoutes.get('/me', getUserByID);

usersRoutes.patch('/me', updateUserInfo);

usersRoutes.patch('/me/avatar', updateAvatar);

module.exports = {
  usersRoutes,
};
