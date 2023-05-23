const INCORRECT_DATA_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;
const default_error_message = {message:'An error occurred on the server'};

const regex = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;


module.exports = {
    INCORRECT_DATA_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    DEFAULT_ERROR_CODE,
    OK_STATUS_CODE,
    default_error_message,
    regex,
    UNAUTHORIZED_ERROR_CODE
}