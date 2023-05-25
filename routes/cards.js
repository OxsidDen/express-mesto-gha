const cardsRouter = require('express').Router();
const {
  getCards, postCard, deletCard, putLike, deletLike,
} = require('../controllers/cards');
const { idCardValidator, cardValidator } = require('../middlewares/cardValidator');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', cardValidator, postCard);

cardsRouter.delete('/cards/:cardId', idCardValidator, deletCard);

cardsRouter.put('/cards/:cardId/likes', idCardValidator, putLike);

cardsRouter.delete('/cards/:cardId/likes', idCardValidator, deletLike);

module.exports = cardsRouter;
