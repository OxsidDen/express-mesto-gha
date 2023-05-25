const { EXISTING_EMAIL_ERROR_CODE } = require('../utils/utils');

class ExistingError extends Error {
  constructor(message) {
    super(message);
    this.type = ExistingError;
    this.statusCode = EXISTING_EMAIL_ERROR_CODE;
  }
}

module.exports = { ExistingError };
