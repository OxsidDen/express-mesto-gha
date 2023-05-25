const jwt = require('jsonwebtoken');
const { AuthorisationErr } = require('../error/AuthorisationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new AuthorisationErr('Authorization required');
};

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(res);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;

  return next();
};

module.exports = auth;
