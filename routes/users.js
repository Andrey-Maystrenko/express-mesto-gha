const express = require('express');
const { getUsers, getUserByID, createUser, updateUserInfo } = require('../controllers');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', getUserByID);

usersRoutes.post('/', express.json(), createUser);

usersRoutes.patch('/me', express.json(), updateUserInfo);

module.exports = {
  usersRoutes,
};
