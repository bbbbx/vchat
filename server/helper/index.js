const { SECRET_KEY } = require('../constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const createToken = (data) => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token, callback) => {
  return jwt.verify(token, SECRET_KEY, callback);
};

const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);

const checkPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  checkPassword
};
