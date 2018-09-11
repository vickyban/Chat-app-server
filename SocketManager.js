const TYPING = 'TYPING';
const SEND = 'SEND';
const NEW_MESSAGE = 'NEW_MESSAGE';
const REPLYING = 'REPLYING';
const ADD_TYPING_USER = 'ADD_TYPING_USER';
const REMOVE_TYPING_USER = 'REMOVE_TYPING_USER';


const io = require('./server').io;

module.exports = function (socket) {
  console.log("New client connected with socketId:", socket.id);

  socket.on(NEW_MESSAGE, message => {
    console.log(`ID: ${socket.id} Received message: ${message.text}`);
    socket.broadcast.emit(NEW_MESSAGE, message);
  });

  socket.on(ADD_TYPING_USER, userID => {
    socket.broadcast.emit(ADD_TYPING_USER, userID);
  });

  socket.on(REMOVE_TYPING_USER, userID => {
    socket.broadcast.emit(REMOVE_TYPING_USER, userID);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
}