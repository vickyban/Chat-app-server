const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomName: { type: String },
  owner: { type: String, required: true },
})

modelu.exportst = mongoose.model('Chatroom', chatroomSchema);