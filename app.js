const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { login, createUser } = require('./controllers/users');
const BadPathError = require('./errors/bad-path-error');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');
const { errorsProcessing } = require('./middlewares/errors-processing');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(express.json());

// здесь будет создан путь "/users" и путь "/cards"
app.use(routes);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// app.use('/*', (req, res) => { res.status(404).send({ message: 'Введен некорректный путь' }); });
app.use('/*', (req, res, next) => { next(new BadPathError('Введен некорректный путь')); });

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsProcessing);

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/mestodb', {
  });

  app.listen(PORT);
}

main();
