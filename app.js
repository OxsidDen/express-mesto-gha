const express = require('express');
const mogoose = require('mongoose');
const userRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')
const app = express();
const {PORT = 3000} = process.env;

mogoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
    req.user = {
      _id: '644ecfcc50f1ee28bcfc81c4'
    };
    next();
});
app.use(userRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
