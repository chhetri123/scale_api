const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ roomId: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
