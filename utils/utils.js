const INCORRECT_DATA_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const ACCESS_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const EXISTING_EMAIL_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;
const defaultErrorMessage = { message: 'An error occurred on the server' };

const regex = /(?:https?:\/\/)?(?:[\w.]+)\.(?:[a-z]{2,6}\.?)(?:\/[\w.]*)*\/?/;

module.exports = {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  ACCESS_ERROR_CODE,
  OK_STATUS_CODE,
  defaultErrorMessage,
  EXISTING_EMAIL_ERROR_CODE,
  regex,
  UNAUTHORIZED_ERROR_CODE,
};
