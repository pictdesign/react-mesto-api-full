const AuthorizationError = require('../errors/AuthorizationError');
const { checkToken } = require('../helpers/jwt');
const User = require('../models/user');

const isAuthorized = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  let payload;
  try {
    payload = checkToken(jwt);
    User.findOne({ id: payload })
      .then((user) => {
        if (!user) {
          throw new AuthorizationError('Необходимо авторизоваться');
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};

module.exports = { isAuthorized };
