const http = require('http');
const server = http.createServer().listen(process.env.PORT || 3000, process.env.IP);
const socketio = require('socket.io')(server)

socketio.on('connection', (socket) => {
    console.log(socket.id);
});
