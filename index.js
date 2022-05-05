const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydb', {
    userNewUrlParser: true,
    userUnifieldTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
}

main();
