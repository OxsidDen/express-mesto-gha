const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;

const { AuthorisationErr } = require('../error/AuthorisationError');
const { AccessErr } = require('../error/AccessError');
const { NotFoundErr } = require('../error/NotFoundError');

const {
  NCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  defaultErrorMessage,
} = require('../utils/utils');
const { ExistingError } = require('../error/ExistingError');

const errorMiddlewares = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(NCORRECT_DATA_ERROR_CODE).send({ message: 'Check the correctness of the data' });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'User is not found' });
  }
  if (err instanceof NotFoundErr || err instanceof AuthorisationErr
    || err instanceof AccessErr || err instanceof ExistingError) {
    const { message } = err;
    return res.status(err.statusCode).send({ message });
  }
  res.status(DEFAULT_ERROR_CODE).send(defaultErrorMessage);
  return next();
};

module.exports = { errorMiddlewares };
