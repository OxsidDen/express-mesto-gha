const { Joi, celebrate } = require('celebrate');
const { regex } = require('../utils/utils');

const idValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().hex(),
  }),
});

const profileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

const signinValifator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  signinValifator,
  signupValidator,
  idValidator,
  profileValidator,
  avatarValidator,
};
