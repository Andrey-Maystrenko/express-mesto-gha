class BadPathError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 406;
  }
}

module.exports = BadPathError;
