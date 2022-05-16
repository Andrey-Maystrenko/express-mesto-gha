const Card = require('../models/Card');
// const res = require('express/lib/response');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({
      message: 'Произошла ошибка в работе сервера',
      err,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    // const deletedCard = await Card.deleteOne({ _id: req.params.cardId });
    const deletedCard = await Card.findByIdAndRemove(req.params.cardId);
    if (!deletedCard) {
      res.status(404).send({
        message: 'Карточки с таким id не найдено',
      });
      return;
    }
    res.status(200).send(deletedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({
        message: 'Некорректный формат id',
        err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const createCard = async (req, res) => {
  try {
    const newCard = new Card({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    res.status(201).send(await newCard.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!likedCard) {
      res.status(404).send({
        message: 'Карточка с таким id не найдена',
      });
      return;
    }
    res.status(200).send(likedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({
        message: 'Некорректный формат id карточки',
        err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!dislikedCard) {
      res.status(404).send({
        message: 'Карточка с таким id не найдена',
      });
      return;
    }
    res.status(200).send(dislikedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({
        message: 'Некорректный формат id карточки',
        err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
