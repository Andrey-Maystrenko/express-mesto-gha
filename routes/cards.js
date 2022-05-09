const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers');

const cardsRoutes = express.Router();

// usersRoutes.get('/users', getUsers);

// usersRoutes.get('/users/:userId', getUserByID);

// usersRoutes.post('/users', express.json(), createUser);

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:userId', deleteCard);

module.exports = {
  cardsRoutes,
};
