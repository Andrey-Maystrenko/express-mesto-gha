const express = require('express');
const { getUsers, getUserByID, createUser } = require('../controllers');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id', getUserByID);

usersRoutes.post('/', express.json(), createUser);

module.exports = {
  usersRoutes,
};
