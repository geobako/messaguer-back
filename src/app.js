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
const admin = require('firebase-admin');

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://messaguer-9d76f.firebaseio.com'
});

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

        users.forEach(u => {
            if (u._id.toString() !== message.user.id && u.subscription) {
                const payload = JSON.stringify({
                    title: `${message.user.name} sent a message`
                });

                webpush.sendNotification(u.subscription, payload);
            }
            if (u._id.toString() !== message.user.id && u.mobileToken) {
                const registrationToken = u.mobileToken;
                const newmessage = `${message.user.name} sent a message`;
                const options = { priority: 'high', timeToLive: 60 * 60 * 24 };
                const send_message = {
                    notification: {
                        title: newmessage
                    }
                };

                admin.messaging().sendToDevice(registrationToken, send_message, options);
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
