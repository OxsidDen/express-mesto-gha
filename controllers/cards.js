const { ValidationError, DocumentNotFoundError } = require('mongoose').Error;
const { AccessErr } = require('../error/AccessError');
const { NotFoundErr } = require('../error/NotFoundError');
const { IncorrectDataErr } = require('../error/IncorrectDataError');
const Card = require('../models/card');
const { OK_STATUS_CODE } = require('../utils/utils');

const getOwnerId = (req) => req.user._id;

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = getOwnerId(req);
  Card.create({ name, link, owner })
    .then((card) => res.status(OK_STATUS_CODE).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataErr('Check the correctness of the data'));
      } else next(err);
    });
};

const deletCard = async (req, res, next) => {
  const { cardId } = req.params;
  const owner = getOwnerId(req);
  try {
    const card = await Card.findById(cardId);
    if (owner !== card.owner) {
      throw new AccessErr('You cannot delete another user card');
    }
    const deletedCard = await Card.findByIdAndRemove(cardId);
    res.status(OK_STATUS_CODE).send({ deletedCard });
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      next(new NotFoundErr('The card with the specified _id was not found'));
    } else next(err);
  }
};

const putLike = (req, res, next) => {
  const ownerId = getOwnerId(req);
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Passed non-existent card _id');
      }
      res.status(OK_STATUS_CODE).send({ card });
    })
    .catch(next);
};

const deletLike = (req, res, next) => {
  const ownerId = getOwnerId(req);
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Passed non-existent card _id');
      }
      res.status(OK_STATUS_CODE).send({ card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deletCard,
  putLike,
  deletLike,
};
