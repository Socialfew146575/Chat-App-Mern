const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
   text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    },
  
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
