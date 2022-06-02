const req = require('express/lib/request');
const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'some-secret-key';
const { JWT_SECRET = 'some-secret-key' } = process.env;

const isAuthorized = async (token) => {
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return !!payload;
  } catch (err) {
    return false;
  }
};

module.exports = {
  isAuthorized,
  JWT_SECRET,
};
