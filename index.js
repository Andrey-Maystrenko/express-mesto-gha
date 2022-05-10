const express = require('express');
// const res = require('express/lib/response');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '6278fdd7405a158358c9aeea',
  };
  next();
});

//здесь будет создан путь "/users"
app.use(routes);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

module.exports.createUser = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/mestodb', {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
}

main();
