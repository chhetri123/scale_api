const logger = require("../utils/logger");

module.exports = (io) => {
  io.on("connection", (socket) => {
    logger.info(`User connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      logger.info(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("message", (data) => {
      io.to(data.roomId).emit("message", {
        userId: socket.id,
        message: data.message,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};
