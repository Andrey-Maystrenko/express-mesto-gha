const express = require('express');
const mongoose = require('mongoose');
// const { auth } = require('./middlewares/auth');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();

app.use(express.json());

// здесь будет создан путь "/users" и путь "/cards"
app.use(routes);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(9),
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use('/*', (req, res) => { res.status(404).send({ message: 'Введен некорректный путь' }); });

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Произошла ошибка в работе сервера'
        : message,
    });
  next();
});

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/mestodb', {
  });

  app.listen(PORT);
}

main();

// app.use(auth);

// app.use('/cards', require('./routes/cards'));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6278fdd7405a158358c9aeea',
//   };
//   next();
// });
