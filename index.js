var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var index = require('./routes/index');

const port = process.env.PORT || 4001;

const app = express();
app.use(index);

const server = http.createServer(app);

const io = module.exports.io = socketIo(server);
const SocketManager = require('./SocketManager')

io.on('connection', SocketManager);

server.listen(port, () => console.log(`Listening on port ${port}`));
