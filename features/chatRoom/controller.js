const mongoose = require('mongoose');
// Models
const Chatroom = require('../chatRoom/roomModel');
const Message = require('../chatRoom/messageModel');

exports.newMessage = async ({ room_id, message }, cb) => {
  const newMsg = new Message({
    _id: mongoose.Types.ObjectId(),
    author: message.author,
    author_id: message.author_id,
    room_id: room_id,
    timestamp: Date.now()
  })
  try {
    const result = await newMsg.save();
    socket.broadcast.emit('message', result);
    cb(null, result)
  } catch (err) {
    console.log('failed to send new message')
    cb({ error: 'failed to send' }, null)
  }

}