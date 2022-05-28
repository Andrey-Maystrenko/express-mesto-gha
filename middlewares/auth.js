// const express = require('express');

const req = require('express/lib/request');
const jwt = require('jsonwebtoken');

const isAuthorized = async (token) => {
  try {
    const payload = await jwt.verify(token, 'some-secret-key');
    req.user = payload;
    return !!payload;
  } catch (err) {
    return false;
  }
};

module.exports = {
  isAuthorized,
};
