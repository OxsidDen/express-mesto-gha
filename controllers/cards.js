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

const getCards = (req,res) => {
    Card.find()
        .then(cards => res.status(OK_STATUS_CODE).send(cards))
        .catch(e =>  res.status(DEFAULT_ERROR_CODE).send(default_error_message))
}

const postCard = (req,res) => {
    const {name, link} = req.body;
    const owner = getOwnerId(req)
    Card.create({name, link, owner})
        .then(card => res.status(OK_STATUS_CODE).send({data: card}))
        .catch((e) => {
            if(e.name == "ValidationError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was passed during card creation"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message);

        })
}

const deletCard = (req,res) => {
    const { cardId } = req.params;
    Card.findByIdAndRemove(cardId)
        .then((card) => {
            if(!card){
                return res.status(NOT_FOUND_ERROR_CODE).send({mesaage: "The card with the specified _id was not found"});
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({mesaage: "Incorrect data was passed during card delete"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message)
        })
}

const putLike = (req,res) => {
    const ownerId = getOwnerId(req)
    const { cardId } = req.params;
    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId}}, {new: true})
        .then((card) => {
            if(!card){
                return res.status(NOT_FOUND_ERROR_CODE).send({message: "Passed non-existent card _id"});
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data sent to like"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message)
        })
}

const deletLike = (req,res) => {
    const ownerId = getOwnerId(req)
    const { cardId } = req.params;
    Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId}}, {new: true})
        .then((card) => {
            if(!card){
                return res.status(NOT_FOUND_ERROR_CODE).send({message: "Passed non-existent card _id"})
            }
            res.status(OK_STATUS_CODE).send({card})
        })
        .catch((e) => {
            if(e.name == "CastError"){
                return res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Incorrect data was sent to remove the like"});
            }
            res.status(DEFAULT_ERROR_CODE).send(default_error_message)
        })
}

module.exports = {
    getCards,
    postCard,
    deletCard,
    putLike,
    deletLike
}
