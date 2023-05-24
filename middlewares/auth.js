const jwt = require('jsonwebtoken');
const { AuthorisationError } = require('../error/error');
const { NODE_ENV, JWT_SECRET } = process.env;


const handleAuthError = (res) => {
  throw new AuthorisationError('Authorization required')
};

const auth= (req, res, next) => {
  const  token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(res);
  }
  let payload;
  try {
    payload = jwt.verify(token,  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload; 

  next(); 
};

module.exports = auth