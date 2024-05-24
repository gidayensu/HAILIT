const StatusCodes = require("http-status-codes");
const userService = require("../services/user.service");

const { emailValidator, phoneValidator } = require("../utils/util");
require("dotenv").config({ path: "./../../.env" });

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    const user = { users: allUsers };
    if (res && res.status) {
      res.status(200).json({ users: allUsers });
      return;
    }
  } catch (err) {
    if (res && res.status) {
      res.status(500).json({ error: "server error" });
    }
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (res && res.status) {
      const oneUser = await userService.getOneUser(userId);
      res.status(200).json({ user: oneUser });
    }
    // }
    else {
      res.status(401).json({ error: "user not found" });
    }
  } catch (err) {
    if (res && res.status) {
      res.status(500).json({ error: "server error" });
    }
  }
};

const getUserIdUsingEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const userDetails = await userService.getUserIdUsingEmail(email);
    res.status(200).json({ user: userDetails });
  } catch (err) {
    return { error: "Wrong email" };
  }
};

const addUser = async (req, res) => {
  try {
    const { user_id, email } = req.body;

    if (!user_id || !email) {
      return res.status(200).json({ error: "all fields are required" });
    }
    if (!emailValidator(email)) {
      return res.status(200).json({ error: "enter a correct email" });
    }

    const userDetails = req.body;
    const addingUser = await userService.addUser(userDetails);

    if (addingUser.error) {
      return res.status(403).json({ error: addingUser.error });
    }
    const response = { user: addingUser };

    res.status(200).json({ user: addingUser });
  } catch (err) {
    res.status(400).json({ error: "Error occurred in adding user" });
  }
};
//updating user
const updateUser = async (req, res) => {
  try {
    const {
      first_name = "" | "unknown",
      last_name = "" | "unknown",
      email = "",
      phone_number = "",
      user_role = "",
    } = req.body;

    
    if (!first_name && !last_name && !email && !phone_number && !user_role) {
      return res.status(401).json({ error: "no information provided" });
    }

    if (!phoneValidator(phone_number)) {
      return res.status(200).json({ error: "enter a correct phone number" });
    }

    const { userId } = req.params;

    const userDetails = req.body;

    const updateUser = await userService.updateUser(userId, userDetails);
    res.status(200).json({user: updateUser});
  } catch (err) {
    res.status(500).json({ error: "Server error: user not updated" });
  }
};
//deleting user detail
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDelete = await userService.deleteUser(userId);

    res.status(200).json(userDelete);
  } catch (err) {
    res.status(500).json({ error: "user not deleted, server error" });
  }
};
//exporting functions
module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  getUserIdUsingEmail,
};
