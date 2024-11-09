const User = require("../models/user.model");
const logger = require("../utils/logger");

class UserService {
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      logger.error("Service: Error creating user:", error);
      throw error;
    }
  }
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      logger.error("Service: Error fetching users:", error);
      throw error;
    }
  }

  async uploadUserFile(file, userId) {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      // If you need to update user with file info
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          $push: { files: file.location },
        });
      }

      return {
        fileUrl: file.location,
        fileType: file.mimetype,
        fileName: file.originalname,
      };
    } catch (error) {
      logger.error("Service: Error uploading file:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      logger.error("Service: Error fetching user:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
