const http = require('http');
const app = require('./src/app');
const keys = require('./src/config/keys');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const server = new http.Server(app);
const io = socketio(server);

let users = [];

io.on('connection', async socket => {
    socket.on('login', data => {
        if (!users.find(el => el[data.username] === data.id)) {
            users.push({
                [data.username]: data.id,
                id: data.id,
                name: data.username
            });
        }
        socket.broadcast.emit('UserAdded', { name: data.username });
    });

    socket.on('getUsers', data => {
        io.to(`${data.id}`).emit('users', users);
    });

    socket.on('disconnect', function() {
        users = users.filter(el => el.id !== socket.id);
        socket.emit('disconnected', users);
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
