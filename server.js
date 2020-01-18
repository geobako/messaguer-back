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
        const newUser = { [data.username]: data.id, id: data.id, name: data.username };
        if (!users.find(el => el[data.username] === data.id)) {
            users.push(newUser);
        }
        socket.broadcast.emit('UserAdded', { user: newUser });
    });

    socket.on('getUsers', data => {
        console.log('works');
        io.to(`${data.id}`).emit('users', { users: users.filter(el => el.id !== data.id) });
    });

    socket.on('logout', function(data) {
        users = users.filter(el => el.id !== data.id);
        socket.broadcast.emit('userLoggedOut', { users: users });
    });

    socket.on('someonePinged', data => {
        console.log(data);
        let by = users.find(el => el.id === data.by);

        io.to(`${data.user.id}`).emit('pinged', { by });
    });

    socket.on('disconnect', function() {
        users = users.filter(el => el.id !== socket.id);
        io.emit('disconnected', { users: users });
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
