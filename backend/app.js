const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const bodyParser = require('body-parser');
const rateLimiter = require('./utils/security');
const authRouter = require('./router/auth');
const userRouter = require('./router/users');
const cardsRouter = require('./router/cards');
const error = require('./middlewares/error');
const Cors = require('./middlewares/cors');
const { isAuthorized } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mesto', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(rateLimiter);
app.use(Cors);
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authRouter);
app.use(isAuthorized, userRouter);
app.use(isAuthorized, cardsRouter);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
