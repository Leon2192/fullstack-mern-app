const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json([" The email is already in use"]);

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved.id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch)
      return res.status(400).json({ message: " Incorrect password" });

    const token = await createAccessToken({ id: userExists.id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });

    res.json({
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

module.exports = { register, login, logout, profile, verifyToken };
