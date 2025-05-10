const chalk = require("chalk");
const User = require("../models/userModel");

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "missing fields" });

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(chalk.red(error.stack));
    res.status(500).json({ error: "Internal server error" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword)
      return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "Email not found" });

    if (user.password !== password)
      return res.status(401).json({ error: "Password doesn't match" });

    user.password = newPassword;

    await user.save();
    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error(chalk.red(error.stack));
    return res.status(500).json({ error: "Internal server error" });
  }
};
const closeAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ error: "No account found with that email" });

    if (user.password !== password)
      return res.status(401).json({ error: "Passwords don't match" });

    await User.findByIdAndDelete(user._id);
    return res.status(204).end();
  } catch (error) {
    console.error(chalk.red(error.stack));
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { create, updatePassword, closeAccount };
