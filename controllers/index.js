const USERS = require('../users.json');

const getUsers = (req, res) => {
  res.status(200).send(USERS);
};

const getUserByID = (req, res) => {
  res.status(200).send(USERS.find((user) => req.params.id === user._id));
};

const createUser = (req, res) => {
  res.status(201).send(req.body);
};

module.exports = {
  getUsers, getUserByID, createUser,
};
