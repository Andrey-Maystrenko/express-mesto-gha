const User = require('../models/User');
const Card = require('../models/Card');
// const res = require('express/lib/response');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: 'Произошла ошибка в работе сервера',
      err,
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).send({
        message: 'Пользователя с таким id не найдено',
        err,
      });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    res.status(201).send(await newUser.save());
  } catch (err) {
    if (err.errors.name.name === 'ValidationError') {
      res.status(400).send({
        message: 'Введены ошибочные данные',
        ...err,
      });
    }
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send({
      message: 'Введены ошибочные данные',
      err,
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(updatedAvatar);
  } catch (err) {
    res.status(400).send({
      message: 'Введены ошибочные данные',
      err,
    });
  }
};

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
    const deletedCard = await Card.deleteOne({ _id: req.params.cardId });
    res.status(200).send(deletedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).send({
        message: 'Карточки с таким id не найдено',
        err,
      });
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
    res.status(400).send({
      message: 'Введены ошибочные данные',
      ...err,
    });
  }
};

const likeCard = async (req, res) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    res.status(200).send(likedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).send({
        message: 'Карточки с таким id не найдено',
        err,
      });
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
    res.status(200).send(dislikedCard);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(404).send({
        message: 'Карточки с таким id не найдено',
        err,
      });
    }
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  createCard,
  getCards,
  deleteCard,
  updateUserInfo,
  likeCard,
  dislikeCard,
  updateAvatar,
};
