const User = require('../models/User');
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
    if (!user) {
      res.status(404).send({
        message: 'Пользователя с таким id не найдено',
      });
      return;
    } res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({
        message: 'Недопустимый формат id',
        ...err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const createUser = async (req, res) => {
  try {
    // const newUser = new User(req.body);
    // res.status(201).send(await newUser.save());
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Введены ошибочные данные',
        ...err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!req.body.name || !req.body.about) {
      res.status(400).send({
        message: 'Введены ошибочные данные',
      });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send({ updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Введены ошибочные данные',
        ...err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!req.body.avatar) {
      res.status(400).send({
        message: 'Введены ошибочные данные',
      });
      return;
    }
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send({ data: updatedAvatar });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Введены ошибочные данные',
        ...err,
      });
    } else {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    }
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUserInfo,
  updateAvatar,
};
