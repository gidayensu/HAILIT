
const StatusCodes = require("http-status-codes");
const userService = require("../services/user.service");


const { emailValidator, phoneValidator } = require("../utils/util");
require("dotenv").config({ path: "./../../.env" });

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    if (res && res.status) {
      res.status(200).json({ data: allUsers });
      return;
    }
  } catch (error) {
    if (res && res.status) {
      res.status(500).json({ message: "server error" });
    }
  }
};




const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    
    // const jwtUserId = req.user.user_id;
    // const isAdmin = await userIsUserRole(jwtUserId, 'admin');

    // if (jwtUserId === userId || isAdmin) {
    if (res && res.status) {
      const oneUser = await userService.getOneUser(userId);
      res.status(200).json({ user: oneUser });
    }
    // }
    else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    if (res && res.status) {
      res.status(500).json({ message: "server error" });
    }
  }
};

const getUserIdUsingEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    const userDetails = await userService.getUserIdUsingEmail(email);
    res.status(200).json({ data: userDetails });
  } catch (err) {
    return { message: "Wrong email" };
  }
};

const addUser = async (req, res) => {
  try {
    const { user_id,  email } = req.body;
    
    if (!user_id || !email ) {
      return res.status(200).json({ message: "all fields are required" });
    }
    if (!emailValidator(email)) {
      return res.status(200).json({ message: "enter a correct email" });
    }

    

    const userDetails = req.body;
    const addingUser = await userService.addUser(userDetails);

    // res.setHeader('Set-Cookie', 'logged-in=true')
    res.status(200).json({ message: addingUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error occurred in adding user" });
  }
};
//updating user
const updateUser = async (req, res) => {
  try {
    const {
      first_name = "",
      last_name = "",
      email = "",
      phone_number = "",
    } = req.body;
    if (!first_name && !last_name && !email && !phone_number) {
      return res
        .status(401)
        .json({ message: "no information provided" });
    }
    const { userId } = req.params;
    // const jwtUserId = req.user.user_id;
    // const isAdmin = await userIsUserRole(jwtUserId, 'admin');

    // if (userId === jwtUserId || isAdmin) {

    const userDetails = req.body;
    //   if (userDetails.user_role === 'admin' && !isAdmin) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({message: "unauthorized"});
    //   }
    const updateUser = await userService.updateUser(userId, userDetails);
    res.status(200).json({ message: updateUser });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error: user not updated" });
  }
};
//deleting user detail
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDelete = await userService.deleteUser(userId);
    // console.log(userDelete);
    res.status(200).json({ message: userDelete });
  } catch (err) {
    // console.log("could not delete user");

    res.status(500).json({ message: "user not deleted, server error" });
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
