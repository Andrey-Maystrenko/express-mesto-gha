const express = require('express');

const routes = express.Router();

const { usersRoutes } = require('./users');

routes.use('/users', usersRoutes);

module.exports = {
  routes,
};
