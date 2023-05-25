const { DEFAULT_ERROR_CODE } = require('../utils/utils');

class DefaultErr extends Error {
  constructor(message) {
    super(message);
    this.type = DefaultErr;
    this.statusCode = DEFAULT_ERROR_CODE;
  }
}

module.exports = { DefaultErr };
