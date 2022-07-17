const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign({ payload }, NODE_ENV === 'production' ? JWT_SECRET : 'verysecretkey', { expiresIn: '7d' });
const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'verysecretkey');

module.exports = {
  generateToken, checkToken,
};
