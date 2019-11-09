const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./api/routes/index');
const morgan = require('morgan');
const { handleError, CustomError } = require('./helpers/errorHandling');
const { ResponseObject } = require('./helpers/responseHandling');

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

app.get('/error', async (req, res, next) => {
    try {
        const response = new ResponseObject(201, { name: 'george' });
        return res.status(201).json(response);
    } catch (err) {
        next(err);
    }
});

/*
Error handling middleware
*/

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;
