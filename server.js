const app = require("./src/app");
const http = require("http");
const socketIO = require("socket.io");
const logger = require("./src/utils/logger");
const connectDB = require("./src/config/db.config");
const socketConfig = require("./src/config/socket.config");
const { testS3Connection } = require("./src/config/aws.config");

const server = http.createServer(app);
const io = socketIO(server);

// Socket.io configuration
socketConfig(io);

const PORT = process.env.PORT || 3000;

// Initialize MongoDB and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    await testS3Connection();

    // Start server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
