const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const allUsers = await User.find({}).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    const users = allUsers.filter((user) => user._id.toString() !== id);

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllUsers };
