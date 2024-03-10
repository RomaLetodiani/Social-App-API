const express = require("express");
const User = require("../models/user.model");
const { getUser } = require("../middleware/user.middlewares");

const UserRouter = express.Router();

// Create user request
UserRouter.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users request
UserRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get One User request
UserRouter.get("/:userId", getUser, (req, res) => {
  res.status(200).json(res.user);
});

// Delete User request
UserRouter.delete("/:userId", getUser, async (req, res) => {
  const user = res.user;
  const deletedUser = await user.deleteOne();
  res.status(203).json(deletedUser);
});

// add new hobbie
UserRouter.post("/:userId/hobbies", getUser, async (req, res) => {
  const user = res.user;
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "please enter required data 'name,description'" });
  }

  try {
    user.hobbies.push(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// remove hobbie
UserRouter.delete("/:userId/hobbies/:hobbyId", getUser, async (req, res) => {
  const user = res.user;
  const hobbyId = req.params.hobbyId;

  try {
    user.hobbies = user.hobbies.filter((hobby) => hobby._id != hobbyId);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = UserRouter;
