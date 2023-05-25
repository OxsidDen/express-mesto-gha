const routes = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { NotFoundErr } = require('../error/NotFoundError');

const auth = require('../middlewares/auth');
const { signinValifator, signupValidator } = require('../middlewares/userValidator');
const cardsRouter = require('./cards');
const userRouter = require('./users');

routes.post('/signin', signinValifator, login);
routes.post('/signup', signupValidator, createUser);
routes.use(auth);
routes.use(userRouter);
routes.use(cardsRouter);
routes.use('*', () => {
  throw new NotFoundErr('Page not found');
});

module.exports = routes;
