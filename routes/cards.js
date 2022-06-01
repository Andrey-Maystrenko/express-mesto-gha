const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', celebrate({
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), createCard);

cardsRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }),
}), deleteCard);

cardsRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }),
}), likeCard);

cardsRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }),
}), dislikeCard);

module.exports = {
  cardsRoutes,
};
