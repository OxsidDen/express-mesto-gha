const { NOT_FOUND_ERROR_CODE } = require('../utils/utils');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.type = NotFoundErr;
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = { NotFoundErr };
