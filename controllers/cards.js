const Card = require('../models/Card');
// const res = require('express/lib/response');
const { isAuthorized } = require('../middlewares/auth');

const getCards = async (req, res) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    res.status(401).send({ message: 'Нет доступа' });
    return;
  }
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
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    res.status(401).send({ message: 'Нет доступа' });
    return;
  }
  try {
    const cardToDelete = await Card.findById(req.params.cardId);
    if (!cardToDelete) {
      res.status(404).send({
        message: 'Карточки с таким id не найдено',
      });
      return;
    }
    if (req.user._id !== cardToDelete.owner.toString()) {
      res.status(403).send({ message: 'Нельзя удалять чужие карточки' });
      return;
    }
    const deletedCard = await Card.findByIdAndRemove(req.params.cardId);
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
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    res.status(401).send({ message: 'Нет доступа' });
    return;
  }
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
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    res.status(401).send({ message: 'Нет доступа' });
    return;
  }
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
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    res.status(401).send({ message: 'Нет доступа' });
    return;
  }
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
// const deletedCard = await Card.deleteOne({ _id: req.params.cardId });
