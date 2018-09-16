const mongoose = require('mongoose');
const User = require('../user/model');
const Session = require('./model');

// create new Session
exports.session_create = async (socket_id, user_id) => {
  const session = new Session({
    _id: mongoose.Types.ObjectId(),
    socket_id: socket_id,
    user_id: user_id
  });
  try {
    const result = await session.save();
    console.log(result);
  } catch (err) {
    console.log("create session error:", err);
  }
}

// removeUser(id)
exports.session_destroy = async (socket_id) => {
  try {
    await Session.remove({ socket_id: socket_id }).exec();
    console.log("Deleted session");
  } catch (err) { console.log("destroy session error:", err) }
}

// getUser(id)