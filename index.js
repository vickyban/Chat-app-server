var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var index = require('./routes/index');

const port = process.env.PORT || 4001;

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket => {
  console.log("New client connected");

  socket.on("message", message => {
    console.log("Received message: ", message.text);
  });


  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));