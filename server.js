const express = require('express');
const http = require('http');
const app = express();

const socketio = require('socket.io');

const server = http.createServer(app);
const io =  socketio(server);


let users = {
    'aman' : 'aman9211'
}
let socketMap = {};

io.on('connection', (socket) => {
    console.log('connected with socket id = ', socket.id);
    function login(s, u) {
        s.join(u);
        s.emit('logged_in');
        socketMap[s.id] = u;
        console.log(socketMap);
    }
//    socket.on('msg_send', (data) => {
//     // console.log('recieved', data.msg);
//     io.emit('msg_rcvd', data);
//    })
socket.on('login', (data) => {
   if(users[data.username]) {
        if(users[data.username] == data.password) {
            // socket.join(data.username);
            // socket.emit('logged_in');
            login(socket, data.username);
        }
        else {
            socket.emit('login_failed');
        }
   }
   else {
        users[data.username] = data.password;
        login(socket, data.username);
   }

//    console.log(users);
})


socket.on('msg_send', (data) => {
    data.from = socketMap[socket.id];
    if(data.to) {
       io.to(data.to).emit('msg_rcvd', data);
    }
    else {
        socket.broadcast.emit('msg_rcvd', data);
    }
})

})
app.use('/', express.static(__dirname + '/public'));




server.listen('3344', () => {
    console.log('Started on http://localhost:3344');
})