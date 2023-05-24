const { Joi, celebrate } = require('celebrate');
const { regex } = require('../utils/utils');

const idCardValidator = celebrate({
  params: Joi.object().keys({ 
    cardId: Joi.string().length(24).required().hex() 
}),
});

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  idCardValidator,
  cardValidator,
};