const { ACCESS_ERROR_CODE } = require('../utils/utils');

class AccessErr extends Error {
  constructor(message) {
    super(message);
    this.type = AccessErr;
    this.statusCode = ACCESS_ERROR_CODE;
  }
}

module.exports = { AccessErr };
