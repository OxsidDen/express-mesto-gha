const { UNAUTHORIZED_ERROR_CODE } = require('../utils/utils');

class AuthorisationErr extends Error {
  constructor(message) {
    super(message);
    this.type = AuthorisationErr;
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = { AuthorisationErr };
