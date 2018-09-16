const TYPING = 'TYPING';
const SEND = 'SEND';
const NEW_MESSAGE = 'message';
const REPLYING = 'REPLYING';
const ADD_TYPING_USER = 'ADD_TYPING_USER';
const REMOVE_TYPING_USER = 'REMOVE_TYPING_USER';


const io = require('./server').io;
const mongoose = require('mongoose');
const Message = require('./features/chatRoom/messageModel');
const Session = require('./features/session/model');

module.exports = function (socket) {
  console.log("New client connected with socketId:", socket.id);

  // create message
  socket.on(NEW_MESSAGE, async (message) => {
    console.log('Received new msg from user');
    const newMsg = new Message({
      _id: mongoose.Types.ObjectId(),
      author: "anonymous",
      text: message.text,
      room_name: message.room,
      timestamp: Date.now()
    })
    try {
      const result = await newMsg.save();
      console.log()
      socket.broadcast.to(message.room).emit('message', result);
    } catch (err) {
      console.log('failed to send new message')
    }
  });

  // on typing
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  // create and join room
  socket.on('join room', roomInfo => {
    const { username, roomName } = roomInfo;
    if (roomName) {
      // join room
      socket.join(roomName, () => {
        socket.emit('rooms', { rooms: Object.keys(socket.rooms), current_room: roomName })
      })

      // after join greet the users
      socket.emit('welcome', { text: `You have joined ${roomName}` });
      socket.broadcast.to(roomName).emit('welcome', { text: `${username ? username : 'anonymous'} has joined the room` });





    }
  });


  socket.on("disconnect", () => console.log("Client disconnected"));
}