const routes = require('express').Router();
const { login,createUser } = require('../controllers/users');
const { NotFoundError } = require('../error/error');

const auth = require('../middlewares/auth');
const { signinValifator, signupValidator} = require('../middlewares/userValidator');
const cardsRouter = require('./cards');
const userRouter = require('./users');

routes.post('/signin',signinValifator, login);
routes.post('/signup',signupValidator, createUser); 
routes.use(auth);
routes.use(userRouter);
routes.use(cardsRouter);
routes.use('*', (req, res, next) => {
    throw new NotFoundError('Page not found')
});

module.exports = routes;