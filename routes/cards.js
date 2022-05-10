const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:cardId', deleteCard);

module.exports = {
  cardsRoutes,
};
