const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const cors = require('cors');


const { db } = require('./db');
const routes = require('./routes');

db.connect();
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['myRandomSuperSecretKey', 'anotherRandomString'],
    maxAge: 10 * 60 * 1000 // 10 minutes
  })
);

app.use(cors());

app.use('/', routes);

module.exports = app;

