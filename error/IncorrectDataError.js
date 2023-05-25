const { INCORRECT_DATA_ERROR_CODE } = require('../utils/utils');

class IncorrectDataErr extends Error {
  constructor(message) {
    super(message);
    this.type = IncorrectDataErr;
    this.statusCode = INCORRECT_DATA_ERROR_CODE;
  }
}

module.exports = { IncorrectDataErr };
