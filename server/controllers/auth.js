const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const saltRounds = 10;

  const { username, password, email } = req.body;

  try {
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.status(400).json({ error: "Email is already used" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

   const user =  await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return res.status(201).json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Incorrect Username or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ error: "Incorrect Username or Password" });

    delete user.password;
    return res.status(201).json({ user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const { avatarImage } = req.body;
    const { id } = req.params;

    // console.log(avatarImage)

   const user = await User.findByIdAndUpdate(id, {
      avatarImage,
      isAvatarImageSet: true,
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, setAvatar };
