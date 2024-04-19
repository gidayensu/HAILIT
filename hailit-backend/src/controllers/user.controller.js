const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');
const userService = require("../services/user.service");
const {userIsUserRole} = require ('../utils/util')


const { emailValidator, phoneValidator } = require( "../utils/util");
require('dotenv').config({path: './../../.env'});


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

const userLogin = async (req, res) => {
  
  try {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({message: "email or password can't be empty"})
    } 
    const checkUserId = await userService.getUserIdUsingEmail(email);
    if (checkUserId.user_id) {
      const {user_id} = checkUserId;
      
      const verifiedUser = await userService.userLogin(
        password,
        user_id
      );
      
      if (verifiedUser.verification_status) {
        const {user_role} = verifiedUser;
        console.log('user_role:', user_role)
        let token = jwt.sign({user_id, user_role}, process.env.JWT_SECRET)
        if (user_role === 'driver' || user_role === 'rider') {
          const {driver_id} = verifiedUser[0]
          console.log('driver_id:', driver_id)
          token = jwt.sign({user_id, user_role, driver_id }, process.env.JWT_SECRET)
        }

        
      
      res.status(200).json({ data: verifiedUser, token });
      } else {
        res.status(404).json({data: verifiedUser})  
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
    
    // const jwtUserId = req.user.user_id;
    // const isAdmin = await userIsUserRole(jwtUserId, 'admin');

      // if (jwtUserId === userId || isAdmin) {
      if (res && res.status) {
        const oneUser = await userService.getOneUser(userId);
        res.status(200).json({data: oneUser});
      }
    // } 
    else {
      res.status(401).json({message: 'Access denied'});
    }
    
  } catch (err) {
    console.log(err)
    if (res && res.status) {
      res.status(500).send({ message: "server error" });
    }
  }
};

const getUserIdUsingEmail = async (req, res) => {
  try {
    const {email } = req.query;
    const userDetails = await userService.getUserIdUsingEmail(email)
    res.status(200).json({data: userDetails})
  } catch (err) {
    
    return {message: "Wrong email/Password"};
  }
};

const addUser = async (req, res) => { 
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;
    if (!first_name || !last_name || !email || !phone_number || !password) {
      return res.status(200).json({message: "all fields are required"})
    } 
    if (!emailValidator(email)) {
      return  res.status(200).json({message: "enter a correct email"})
    }  
    
    if (!phoneValidator(phone_number)) {
     return res.status(200).json({message: "enter a 10-digit phone number"})
    }

    
    const userDetails = req.body;
    const addingUser = await userService.addUser(userDetails);
    
    // res.setHeader('Set-Cookie', 'logged-in=true')
    res.status(200).json({ message: addingUser });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Error occurred in adding user" });
  }
};
//updating user
const updateUser = async (req, res) => {
  try {
    
    
    const { first_name = '', last_name = '', email = '', phone_number = ''} = req.body;
    if(!first_name && !last_name && !email && !phone_number) {
      return res.status(StatusCodes.BAD_REQUEST).json({message: "no information provided"});
    }
    const { userId } = req.params;
    // const jwtUserId = req.user.user_id;
    // const isAdmin = await userIsUserRole(jwtUserId, 'admin');

    // if (userId === jwtUserId || isAdmin) {
    
     const userDetails = req.body;
    //   if (userDetails.user_role === 'admin' && !isAdmin) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({message: "unauthorized"});
    //   }
    const updateUser = await userService.updateUser(
      userId,
      userDetails
    );
    res.status(200).json({ message: updateUser });
    // }
    
  } catch (err) {
    console.log(err)
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
  userLogin
};
