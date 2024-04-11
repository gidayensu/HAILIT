const { v4: uuid } = require("uuid");
const userModel = require("../model/user.model");
const { allowedPropertiesOnly } = require( "../utils/util");



const getAllUsers = async () => {
  
  const users = await userModel.getAllUsers();
  return users;
};

const getOneUser = async (userId) => {
  return await userModel.getOneUser(userId);
};

const getUserIdUsingEmail = async(userEmail)=> {
    return await userModel.getUserIdUsingEmail(userEmail)
}

const userLogin = async (password, user_id) => {
    return await userModel.userLogin(password, user_id)
}

const addUser = async (userDetails) => {
  const allowedProperties = ['user_id','first_name', 'last_name', 'email', 'phone_number', 'user_role']
  try {
    const user_id = await uuid();
    const {password} = userDetails;
    
    const userDetailsWithId = { user_id, ...userDetails};
    const validUserDetailsWithId =  allowedPropertiesOnly(userDetailsWithId, allowedProperties);
    return userModel.addUser(validUserDetailsWithId, password);
  } catch (err) {
    
    return err;
  }
};


const updateUser = async (userId, userDetails) => {
  try {
    
    const allowedProperties = ['first_name', 'last_name', 'email', 'phone_number', 'user_role']
    const validUserDetails = allowedPropertiesOnly(userDetails, allowedProperties)
    return await userModel.updateUser(userId, validUserDetails);
  } catch (err) {
    
    return "Error. User not updated";
  }
};

const deleteUser = async (userId) => {
  return await userModel.deleteUser(userId);
};
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getOneUser,
  getUserIdUsingEmail,
  userLogin
};
