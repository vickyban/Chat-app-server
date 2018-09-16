const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  socket_id: { type: String, required: true }
});

module.exports = mongoose.model('Session', SessionSchema);