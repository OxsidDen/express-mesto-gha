const INCORRECT_DATA_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const ACCESS_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const EXISTING_EMAIL_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;
const default_error_message = {message:'An error occurred on the server'};

const regex = /(https|http?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/;


module.exports = {
    INCORRECT_DATA_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    DEFAULT_ERROR_CODE,
    ACCESS_ERROR_CODE,
    OK_STATUS_CODE,
    default_error_message,
    EXISTING_EMAIL_ERROR_CODE,
    regex,
    UNAUTHORIZED_ERROR_CODE
}