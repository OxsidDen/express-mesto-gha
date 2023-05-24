const { AccessError, NotFoundError } = require('../error/error');
const Card = require('../models/card')
const {
    INCORRECT_DATA_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    DEFAULT_ERROR_CODE,
    OK_STATUS_CODE,
    default_error_message
} = require ('../utils/utils');

const getOwnerId = (req) => {
    return req.user._id;
}

const getCards = (req,res, next) => {
    Card.find()
        .then(cards => res.status(OK_STATUS_CODE).send(cards))
        .catch(next)
}

const postCard = (req,res, next) => {
    const {name, link} = req.body;
    const owner = getOwnerId(req)
    Card.create({name, link, owner})
        .then(card => res.status(OK_STATUS_CODE).send({data: card}))
        .catch(next)
}

const deletCard = (req,res, next) => {
    const { cardId } = req.params;
    Card.findByIdAndRemove(cardId)
        .then((card) => {
            if(!card){
                throw new AccessError("The card with the specified _id was not found");
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch(next)
}

const putLike = (req,res, next) => {
    const ownerId = getOwnerId(req)
    const { cardId } = req.params;
    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId}}, {new: true})
        .then((card) => {
            if(!card){
                throw new NotFoundError("Passed non-existent card _id")
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch(next)
}

const deletLike = (req,res, next) => {
    const ownerId = getOwnerId(req)
    const { cardId } = req.params;
    Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId}}, {new: true})
        .then((card) => {
            if(!card){
                throw new NotFoundError("Passed non-existent card _id")
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch(next)
}

module.exports = {
    getCards,
    postCard,
    deletCard,
    putLike,
    deletLike
}
