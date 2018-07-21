const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'a5717a649d346ed0c51be68888c130cd';
const SALT_ROUNDS = 10;

const createToken = (data) => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token, secretKey, callback) => {
  return jwt.verify(token, secretKey, callback);
};

const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);

const checkPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  checkPassword
};
