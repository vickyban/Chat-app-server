const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');

const port = process.env.PORT || 4001;

const server = http.createServer(app);

const io = module.exports.io = socketIo(server);
const SocketManager = require('./socketManager');

io.on('connection', SocketManager);

server.listen(port, () => console.log('Listen to port', port));
