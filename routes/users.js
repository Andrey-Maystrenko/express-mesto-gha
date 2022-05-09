const express = require('express');
const { getUsers, getUserByID, createUser } = require('../controllers');

const usersRoutes = express.Router();

// usersRoutes.get('/users', getUsers);

// usersRoutes.get('/users/:userId', getUserByID);

// usersRoutes.post('/users', express.json(), createUser);

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', getUserByID);

usersRoutes.post('/', express.json(), createUser);

module.exports = {
  usersRoutes,
};
