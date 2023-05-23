const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
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