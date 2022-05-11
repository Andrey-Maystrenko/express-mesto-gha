const User = require("../models/User");
const Card = require("../models/Card");
const res = require("express/lib/response");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: "Произошла ошибка в работе сервера",
      err
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(400).send({
        message: "Пользователя с таким id не найдено",
        err
      });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    res.status(201).send(await newUser.save());
  } catch (err) {
    if (err.errors.name.name === "ValidationError") {
      res.status(400).send({
        message: "Введены ошибочные данные",
        ...err
      });
    }
  }
};

const updateUserInfo = async (req, res) => {
  console.log(req.body);
  console.log(req.user._id);
  const { name, about } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true }
  );
  console.log(JSON.stringify(updatedUser));
  res.status(200).send(updatedUser);
  // try {
  // } catch (err) {
  //   res.status(400).send({
  //     message: "Пользователя с таким id не найдено",
  //     err
  //   });
  // }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({
      message: "Произошла ошибка в работе сервера",
      err
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.deleteOne({ _id: req.params.cardId });
    res.status(200).send(deletedCard);
  } catch (err) {
    console.log(err);
  }
};

const createCard = async (req, res) => {
  try {
    const newCard = new Card({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id
    });
    res.status(201).send(await newCard.save());
  } catch (err) {
    res.status(400).send({
      message: "Введены ошибочные данные",
      ...err
    });
  }
};

const likeCard = async (req, res) => {
  console.log(req.params);
  console.log(req.user);
  const likedCard = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );
  res.status(200).send(likedCard);
};

const dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  );

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  createCard,
  getCards,
  deleteCard,
  updateUserInfo,
  likeCard,
  dislikeCard
};

// const deleteCard = async (req, res) => {
//   try {
//     const deletedCard = await Card.deleteOne({ _id: req.params.cardId });
//     res.status(200).send(deletedCard);
//   } catch (err) {
//     console.log(err);
//     if (err.kind === "ObjectId") {
//       res.status(400).send({
//         message: "Карточки с таким id не найдено",
//         err
//       });
//     }
//   }
// };

// const createUser = async (req, res) => {
//   const { name, about, avatar } = req.body;
//   const newUser = await User.create({ name, about, avatar });
//   res.status(201).send(newUser);
// };

// const updateUserInfo = async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { _id: req.user._id },
//       { $set: { about: req.body.about } }
//     );
//     res.status(201).send(updatedUser);
//   } catch (err) {
//     if (err.kind === "ObjectId") {
//       res.status(400).send({
//         message: "Пользователя с таким id не найдено",
//         err
//       });
//     }
//   }
// };
