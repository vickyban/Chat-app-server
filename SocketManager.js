const io = require('./index').io;

module.exports = function (socket) {
  console.log("New client connected with socketId:", socket.id);

  socket.on("New_Message", message => {
    console.log("Received message: ", message.text);
    socket.broadcast.emit("New_Message", message);
  });


  socket.on("disconnect", () => console.log("Client disconnected"));
}