const {INCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE, ACCESS_ERROR_CODE, UNAUTHORIZED_ERROR_CODE} = require('../utils/utils')

class IncorrectDataError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = INCORRECT_DATA_ERROR_CODE;
    }
}
class AuthorisationError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = UNAUTHORIZED_ERROR_CODE;
    }
}
class AccessError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = ACCESS_ERROR_CODE;
    }
}
class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = NOT_FOUND_ERROR_CODE;
    }
}

class DefaultError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = DEFAULT_ERROR_CODE;
    }
}
  
module.exports ={
    IncorrectDataError,
    AuthorisationError,
    AccessError,
    NotFoundError,
    DefaultError
}