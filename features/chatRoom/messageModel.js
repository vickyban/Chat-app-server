const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: String },
  text: { type: String },
  room_name: { type: String },
  timestamp: { type: Date }
  //author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom', required: true }
});

module.exports = mongoose.model('Message', messageSchema);