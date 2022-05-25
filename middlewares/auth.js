// const express = require('express');

const jwt = require('jsonwebtoken');

const isAuthorized = async (token) => {
  try {
    const payload = await jwt.verify(token, 'some-secret-key');
    return !!payload;
  } catch (err) {
    return false;
  }
};

module.exports = {
  isAuthorized,
};
