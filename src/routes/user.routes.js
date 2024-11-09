const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload.middleware");

router.post("/register", userController.register.bind(userController));
router.get("/", userController.getUsers.bind(userController));
router.post(
  "/upload",
  upload.single("file"),
  userController.uploadFile.bind(userController)
);
router.get("/:userId", userController.getUser.bind(userController));

module.exports = router;
