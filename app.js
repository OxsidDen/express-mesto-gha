require('dotenv').config(); 
const express = require('express');
const mogoose = require('mongoose');
const {DEFAULT_ERROR_CODE} = require('./utils/utils')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const { errorMiddlewares } = require('./middlewares/errors');

const app = express();
const {PORT = 3000} = process.env;

mogoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorMiddlewares);

app.use((err, req, res) => {
    const { statusCode = DEFAULT_ERROR_CODE, message } = err;
    return res.status(DEFAULT_ERROR_CODE).send({message: statusCode ===  DEFAULT_ERROR_CODE ? 'An error occurred on the server': message})
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
