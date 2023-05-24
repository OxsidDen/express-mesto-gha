const {AuthorisationError, AccessError, NotFoundError} = require('../error/error');
const {NCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE, EXISTING_EMAIL_ERROR_CODE, default_error_message} = require('../utils/utils');
const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const errorMiddlewares = (err, req, res, next) => {
    if (err instanceof CastError || err instanceof ValidationError){
        return res.status(NCORRECT_DATA_ERROR_CODE).send({message: "Check the correctness of the data"})
    }
    if(err instanceof DocumentNotFoundError){
        return res.status(NOT_FOUND_ERROR_CODE).send({message: "User is not found"})
    }
    if(err.code == 11000){
        return res.status(EXISTING_EMAIL_ERROR_CODE).send({message: "User with this email is already registered"})
    }
    if (err instanceof NotFoundError || err instanceof AuthorisationError || err instanceof AccessError) {
        const { message } = err;
        return res.status(err.statusCode).send({ message });
    }
    console.log(err)
    res.status(DEFAULT_ERROR_CODE).send(default_error_message)
}

module.exports = {errorMiddlewares}