const express = require('express');
// const res = require('express/lib/response');
const mongoose = require('mongoose');
// const path = require('path');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '6278fdd7405a158358c9aeea',
  };
  next();
});

// здесь будет создан путь "/users" и путь "/cards"
app.use(routes);

app.use('/*', express.json(), (req, res) => { res.status(404).send({ message: 'Введен некорректный путь' }); });

// module.exports.createCard = (req) => {
//   console.log(req.user._id); // _id станет доступен
// };

// module.exports.createUser = (req) => {
//   console.log(req.user._id); // _id станет доступен
// };

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/mestodb', {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  });

  // app.listen(PORT, () => {
  //   console.log(`Слушаем ${PORT} порт`);
  // });

  app.listen(PORT);
}

main();
