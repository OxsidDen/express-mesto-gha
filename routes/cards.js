const cardsRouter = require('express').Router();
const { getCards, postCard, deletCard, putLike, deletLike} = require('../controllers/cards.js')

cardsRouter.get("/cards", getCards )

cardsRouter.post("/cards", postCard)

cardsRouter.delete("/cards/:cardId", deletCard)

cardsRouter.put("/cards/:cardId/likes", putLike)

cardsRouter.delete("/cards/:cardId/likes", deletLike)

module.exports = cardsRouter;