const errorsProcessing = (err, req, res, next) => {
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
};

module.exports = { errorsProcessing };
