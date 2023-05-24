const routes = require('express').Router();
const { login,createUser } = require('../controllers/users');

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
    next();
});

module.exports = routes;