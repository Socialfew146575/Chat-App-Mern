const Message = require("../models/message");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // Validate request body
    if (!from || !to || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the message
    const data = await Message.create({
      text: message,
      users: [from, to],
      sender: from,
    });

    // Check if message was added successfully
    if (data) {
      return res.status(200).json({ message: "Message added successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to add message to the database" });
    }
  } catch (error) {
    console.error("Error while adding message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    // console.log("getAllMessage",req.params);
    const { from, to } = req.params;
    // console.log(from,to)
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.text,
      };
    });

    return res.status(200).json({ projectMessages });
  } catch (error) {
    console.error("Error while Fetching  messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
