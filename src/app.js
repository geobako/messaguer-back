const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./api/routes/index');
const morgan = require('morgan');

const app = express();

/*
middlewares
*/
app.use(compression());
app.use(morgan('tiny'));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  })
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

/*
Swagger
*/
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
Use routes
*/
app.use('/', router);

module.exports = app;
