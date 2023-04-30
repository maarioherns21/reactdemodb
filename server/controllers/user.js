import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Like, Comment } from "../model/movie.js";

export const index = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) return res.json({ message: "Credentials not valid" });

    const result = await bcrypt.compare(password, user.password);

    if (!result) return res.status(401).json({ message: "incorrect password" });

    const token = await jwt.sign({ userId: user._id }, "test", {
      expiresIn: "1h",
    });
    console.log(token);
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, email: user.email, name: user.name },
      });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) return res.json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (!hash) return res.json({ message: " password didnt match" });

    const newUser = new User({ email, password: hash, name });

    console.log(newUser);

    const data = await newUser.save();

    const token = await jwt.sign({ userId: data._id }, "test", {
      expiresIn: "1h",
    });
    console.log(token);
    res
      .status(200)
      .json({
        token,
        user: { id: data._id, email: data.email, name: data.name },
      });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ user: id });
    const likes = await Like.find({ user: id });
    const person = await User.findById(id).select("-password").exec();

    res.status(200).json({ person, comments, likes });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};

