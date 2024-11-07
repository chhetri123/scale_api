const userService = require("../services/user.service");
const logger = require("../utils/logger");
const { createResponse } = require("../utils/response.helper");

class UserController {
  async register(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return createResponse(res, 201, "User registered successfully", user);
    } catch (error) {
      logger.error("Controller: Error in user registration:", error);

      if (error.code === 11000) {
        // MongoDB duplicate key error
        return createResponse(res, 409, "User already exists");
      }

      if (error.name === "ValidationError") {
        return createResponse(res, 400, "Validation error", error.errors);
      }

      return createResponse(res, 500, "Registration failed");
    }
  }

  async uploadFile(req, res) {
    try {
      const fileData = await userService.uploadUserFile(
        req.file,
        req.user?._id
      );
      return createResponse(res, 200, "File uploaded successfully", fileData);
    } catch (error) {
      logger.error("Controller: Error in file upload:", error);

      if (error.message === "No file provided") {
        return createResponse(res, 400, "No file uploaded");
      }

      return createResponse(res, 500, "File upload failed");
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.userId);
      return createResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
      logger.error("Controller: Error fetching user:", error);

      if (error.message === "User not found") {
        return createResponse(res, 404, "User not found");
      }

      return createResponse(res, 500, "Failed to fetch user");
    }
  }
}

module.exports = new UserController();
