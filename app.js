require('dotenv').config();
const express = require('express');
const mogoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorCelebrate = require('celebrate').errors;
const routes = require('./routes/routes');
const { errorMiddlewares } = require('./middlewares/errors');

const app = express();
const { PORT = 3000 } = process.env;

mogoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorCelebrate());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
