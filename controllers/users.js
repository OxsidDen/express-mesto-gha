const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('mongoose').Error;
const User = require('../models/user');
const { OK_STATUS_CODE } = require('../utils/utils');
const { NotFoundErr } = require('../error/NotFoundError');
const { AccessErr } = require('../error/AccessError');
const { IncorrectDataErr } = require('../error/IncorrectDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(OK_STATUS_CODE).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User by specified _id not found');
      }
      return res.status(OK_STATUS_CODE).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(OK_STATUS_CODE).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new AccessErr('User with this email is already registered'));
      } else if (err instanceof ValidationError) {
        next(new IncorrectDataErr('The entered data is not correct'));
      } else next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User by specified _id not found');
      }
      res.status(OK_STATUS_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataErr('The entered data is not correct'));
      } else next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { link } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { link },
    { new: true, runValidators: true },
  )
    .then((avatar) => res.status(OK_STATUS_CODE).send({ data: avatar }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataErr('The entered data is not correct'));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User not found');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
      res.status(OK_STATUS_CODE).send({ _id: token });
    })
    .catch(next);
};

const getMyUser = (req, res, next) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new NotFoundErr('User is not found');
  }
  User.findById(ownerId)
    .then((user) => {
      res.status(OK_STATUS_CODE).send({ user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMyUser,
};
