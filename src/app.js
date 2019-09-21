const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./api/routes/index');

const app = express();

/*
middlewares
*/
app.use(compression());
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  })
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw());
app.use(cors());
// app.use(morgan('dev'))

/*
Use routes
*/
app.use('/', router);

module.exports = app;
