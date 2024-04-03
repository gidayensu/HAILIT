const { v4: uuid } = require("uuid");
const userModel = require("../model/user.model");
const getAllUsers = async () => {
  
  const users = await userModel.getAllUsers();
  return users;
};

const getOneUser = async (userId) => {
  return await userModel.getOneUser(userId);
};

const oneUserQuery = async(userEmail)=> {
    return await userModel.oneUserQuery(userEmail)
}

const userLogin = async (password, user_id) => {
    return await userModel.userLogin(password, user_id)
}

const addUser = async (password, userDetails) => {
  try {
    const userId = await uuid();
    const passwordPlusId = [password, userId];
    
    userDetails.unshift(userId);
    return userModel.addUser(passwordPlusId, ...userDetails);
  } catch (err) {
    
    return err;
  }
};


const updateUser = async (userId, userDetails) => {
  try {
    return await userModel.updateUser(userId, userDetails);
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
  oneUserQuery,
  userLogin
};
