const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./api/routes/index');
const morgan = require('morgan');
const { handleError } = require('./helpers/errorHandling');
const Message = require('./api/models/message.model');
const User = require('./api/models/user.model');
const webpush = require('web-push');
const { privateKey, publicKey } = require('./config/keys');

const WEB_PUSH_CONTACT = 'mailto: giorgosbakogiannis@gmail.com';

webpush.setVapidDetails(WEB_PUSH_CONTACT, publicKey, privateKey);

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

//custom
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        return res.json({ messages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ' An Error has occured. Please try again later' });
    }
});

app.post('/new-message', async (req, res) => {
    try {
        const { message } = req.body;
        const newMessage = await new Message({ text: message.text, user: message.user, id: message.id }).save();
        const users = await User.find();
        console.log('mm', message.user.id);
        users.forEach(u => {
            console.log('fff', u._id);
            if (u._id.toString() !== message.user.id && u.subscription) {
                const payload = JSON.stringify({
                    title: `${message.user.name} sent a message`
                });

                webpush.sendNotification(u.subscription, payload);
            }
        });

        return res.json({ message: newMessage });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ' An Error has occured. Please try again later' });
    }
});

app.post('/subscribe', async (req, res) => {
    try {
        const { user, subscription } = req.body;
        const foundUser = await User.findById(user._id);
        foundUser.subscription = subscription;
        await foundUser.save();
        // const newMessage = await new Message({ text: message.text, user: message.user, id: message.id }).save();
        return res.json({ message: 'ok' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ' An Error has occured. Please try again later' });
    }
});

/*
Error handling middleware
*/

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;
