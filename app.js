require('dotenv').config(); 
const express = require('express');
const mogoose = require('mongoose');
const userRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')
const {createUser, login} = require('./controllers/users')
const {NOT_FOUND_ERROR_CODE} = require('./utils/utils')
const auth = require('./middlewares/auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const {PORT = 3000} = process.env;

mogoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser); 
app.use(auth);
app.use(userRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
    app.use((req, res) => {
        return res.status(NOT_FOUND_ERROR_CODE).send({message: "Wrong path passed"})
    })
    console.log(`server started on port ${PORT}`);
});
