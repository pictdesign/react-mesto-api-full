const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');
const { generateToken } = require('../helpers/jwt');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

const getMe = async (req, res, next) => {
  const userId = req.user.payload;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь с id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Некорректный id пользователя'));
    } else {
      next(error);
    }
  }
};

const createUser = async (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new DuplicateError();
    }
    if (!email || !password) {
      throw new BadRequestError();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email, password: hashPassword, name, about, avatar,
    });
    res.status(200).send({
      user: {
        email: createdUser.email,
        name: createdUser.name,
        about: createdUser.about,
        avatar: createdUser.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user.payload;
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  const userId = req.user.payload;
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Нужны логин и пароль');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user._id);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          secure: true,
          httpOnly: true,
        })
        .send({
          data: {
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
          },
        });
    })
    .catch((err) => next(err));
};

const logout = (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie('jwt')
      .send({ message: 'Возвращайтесь как можно скорее' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  updateAvatar,
  login,
  logout,
};
