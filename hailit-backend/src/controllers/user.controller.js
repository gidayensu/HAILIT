const jwt = require('jsonwebtoken');

const userService = require("../services/user.service");
const { emailValidator, phoneValidator } = require( "../utils/util");
require('dotenv').config({path: './../../.env'});


const getAllUsers = async (req, res) => {
  
  try {
    const allUsers = await userService.getAllUsers();
    if (res && res.status) {
      
      res.status(200).json({ message: allUsers });
      return;
    }
  } catch (error) {
    
    if (res && res.status) {
      res.status(500).json({ message: "server error" });
    }
  }
};

const userLogin = async (req, res) => {
  
  try {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({message: "email or password can't be empty"})
    } 
    const checkUserId = await userService.oneUserQuery(email);
    if (checkUserId.user_id) {
      const {user_id} = checkUserId;
      
      const verifyUser = await userService.userLogin(
        password,
        user_id
      );
      
      if (verifyUser.verification_status) {
        const token = jwt.sign({user_id}, process.env.JWT_SECRET)
      
      res.status(200).json({ message: verifyUser, token });
      } else {
        res.status(404).json({message: verifyUser})  
      } 
    } else {
      res.status(404).json({message: 'wrong email or password'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "server error" });
  }
};



const getOneUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const jwtUserId = req.user.user_id;

      if (jwtUserId === userId) {
      if (res && res.status) {
        const oneUser = await userService.getOneUser(userId);
        res.status(200).json(oneUser);
      }
    } else {
      res.status(401).json({message: 'Access denied'});
    }
    
  } catch (err) {
    console.log(err)
    if (res && res.status) {
      res.status(500).send({ message: "server error" });
    }
  }
};

const oneUserQuery = async (req, res) => {
  try {
    const {email } = req.query;
    const userDetails = await userService.oneUserQuery(email)
    res.status(200).json(userDetails)
  } catch (err) {
    
    return {message: "Wrong email/Password"};
  }
};

const addUser = async (req, res) => {
  
  const { first_name, last_name, email, phone_number, password } = req.body;
  
  
  
  try {
    if (!first_name || !last_name || !email || !phone_number || !password) {
      res.status(200).json({message: "all fields are required"})
    } else if (!emailValidator(email)) {
      res.status(200).json({message: "enter a correct email"})
    } else if (!phoneValidator(phone_number)) {
      res.status(200).json({message: "enter a 10-digit phone number"})
    }

    else {
    const userDetails = [first_name, last_name, email, phone_number];
    const result = await userService.addUser(password, userDetails);
    
    // res.setHeader('Set-Cookie', 'logged-in=true')
    res.status(200).json({ message: result });}
  } catch (err) {
    
    res.status(400).json({ message: "Error occurred" });
  }
};
//updating user
const updateUser = async (req, res) => {

  try {
    const { userId } = req.params;
    const { first_name = '', last_name = '', email = '', phone_number = ''} = req.body;
    const userDetails = [first_name, last_name, email, phone_number];
    const updateUser = await userService.updateUser(
      userId,
      userDetails
    );
    res.status(200).json({ message: updateUser });
  } catch (err) {
    
    res.status(500).json({ message: "server error" });
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
  oneUserQuery,
  userLogin
};
