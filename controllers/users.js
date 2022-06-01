const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthorized } = require('../middlewares/auth');
const User = require('../models/User');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const DUBLICATE_MONGOOSE_ERROR_CODE = 11000;

const getUsers = async (req, res, next) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    next(new UnauthorizedError('Нет доступа'));
    return;
  }
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

const getUserByID = async (req, res, next) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    next(new UnauthorizedError('Нет доступа'));
    return;
  }
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NotFoundError('Нет пользователя с таким id'));
      return;
    } res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Недопустимый формат id'));
    }
  }
};

const userProfile = async (req, res, next) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    next(new UnauthorizedError('Нет доступа'));
    return;
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError('Пользователя с таким id не найдено'));
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Недопустимый формат id'));
    }
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    next(new BadRequestError('Неправильные логин или пароль'));
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const { password: removedPassword, ...user } = newUser.toObject();
    res.status(201).send({ user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены ошибочные данные'));
    }
    if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError('Неправильные логин или пароль'));
      return;
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      next(new UnauthorizedError('Неправильные логин или пароль'));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
  }
};

const updateUserInfo = async (req, res, next) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    next(new UnauthorizedError('Нет доступа'));
    return;
  }
  try {
    const { name, about } = req.body;
    if (!req.body.name || !req.body.about) {
      next(new BadRequestError('Введены ошибочные данные'));
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
      next(new BadRequestError('Введены ошибочные данные'));
    }
  }
};

const updateAvatar = async (req, res, next) => {
  const matched = await isAuthorized(req.headers.authorization);
  if (!matched) {
    next(new UnauthorizedError('Нет доступа'));
    return;
  }
  try {
    const { avatar } = req.body;
    if (!req.body.avatar) {
      next(new BadRequestError('Введены ошибочные данные'));
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
      next(new BadRequestError('Введены ошибочные данные'));
    }
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  login,
  updateUserInfo,
  updateAvatar,
  userProfile,
};
