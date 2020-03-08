const http = require('http');
const app = require('./src/app');
const keys = require('./src/config/keys');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const Message = require('./src/api/models/message.model');

const server = new http.Server(app);
const io = socketio(server);
app.locals.io = io;

let webUsers = [];
let mobileUsers = [];

io.on('connection', async socket => {
    socket.on('login', data => {
        const { _id, name, avatar, isMobile } = data.user;
        const newUser = { socketId: socket.id, name, avatar, id: _id };
        if (isMobile) {
            if (!mobileUsers.find(el => el.id === data.id)) {
                mobileUsers.push(newUser);
            }
        } else {
            if (!webUsers.find(el => el.id === data.id)) {
                webUsers.push(newUser);
            }
        }

        socket.broadcast.emit('UserAdded', { user: newUser });
    });

    socket.on('message-sent', function(data) {
        const { message } = data;
        console.log(message);
        socket.broadcast.emit('new-message', { message });
    });

    socket.on('logout', function(data) {
        console.log('logout');
        webUsers = webUsers.filter(el => el.socketId !== data.id);
        mobileUsers = mobileUsers.filter(el => el.socketId !== data.id);
    });

    socket.on('disconnect', function() {
        webUsers = webUsers.filter(el => el.socketId !== socket.id);
        mobileUsers = mobileUsers.filter(el => el.socketId !== socket.id);
        // io.emit('disconnected', { users: users });
    });
});

const PORT = process.env.PORT || 5001;

mongoose
    .connect(keys.mongoConnectionString, { useNewUrlParser: true })
    .then(result => {
        console.log('Connected to database');
        server.listen(PORT, () => console.log(` Server is up on port ${PORT}`));
    })
    .catch(err => console.log(err));
