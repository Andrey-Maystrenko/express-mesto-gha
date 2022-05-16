const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6278fdd7405a158358c9aeea',
  };
  next();
});

app.use(express.json());

// здесь будет создан путь "/users" и путь "/cards"
app.use(routes);

app.use('/*', (req, res) => { res.status(404).send({ message: 'Введен некорректный путь' }); });

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/mestodb', {
  });

  app.listen(PORT);
}

main();
