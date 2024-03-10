const User = require("../models/user.model");

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId).populate("posts");
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getUser };
