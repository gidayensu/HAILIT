const { v4: uuid } = require("uuid");
const userModel = require("../model/user.model");
const driverModel = require("../model/driver.model");
const riderModel = require("../model/rider.model");
const { allowedPropertiesOnly, userIsUserRole } = require( "../utils/util");

let allowedProperties = ['user_id','first_name', 'last_name', 'email', 'phone_number', 'user_role'];


const getAllUsers = async () => {
  try {
  const users = await userModel.getAllUsers();
  return users;
} catch (err) {
  return "Error occurred in getting all users"
}
};

const getOneUser = async (userId) => {
  try {
  const user = await userModel.getOneUser(userId);
  console.log(user.user_role)
  if(user.user_role === 'driver') {
    const driverDetails = await driverModel.getDriverDetailOnCondition('user_id', userId);
    
    return {...user, ...driverDetails}
  }
  if(user.user_role === 'rider') {
    const riderDetails = await riderModel.getRiderOnCondition('user_id', userId);
    return {...user, ...riderDetails}
  }
  return user;
  } catch (err){
    console.log(err)
    return "Error occurred in getting user";
  }
};

const getUserIdUsingEmail = async(userEmail)=> {
  try {
  const user =   await userModel.getUserIdUsingEmail(userEmail)
  return user;
} catch (err){
  console.log(err)
  return "Error occurred in getting user";
}
}

const userLogin = async (password, user_id) => {
  try {
    const userLogin = await  userModel.userLogin(password, user_id);
    const exportUserData =  {
      email: userLogin[0].email,
      first_name: userLogin[0].first_name,
      last_name: userLogin[0].last_name,
      phone_number: userLogin[0].phone_number,
      user_role: userLogin[0].user_role,
      verification_status: true
    }

    
  if(userLogin[0].user_role === 'driver') {
    const driverDetails = await driverModel.getDriverDetailOnCondition('user_id', user_id);
    console.log('this:', driverDetails)
    return {...exportUserData, ...driverDetails}
  }
  if(userLogin[0].user_role === 'rider') {
    const riderDetails = await riderModel.getRiderOnCondition('user_id', user_id);
    return {...exportUserData, ...riderDetails}
  }
    return exportUserData;
  } catch (err) {
    console.log(err)
    return "Error occurred in logging in user"
  }
}

const addUser = async (userDetails) => {
  
  const user_id_property = 'user_id';
  allowedProperties.unshift(user_id_property);
  try {
    const user_id = await uuid();
    const {password} = userDetails;

    const userDetailsWithId = { user_id, ...userDetails};
    const validUserDetailsWithId =  allowedPropertiesOnly(userDetailsWithId, allowedProperties);
    
    return userModel.addUser(validUserDetailsWithId, password);
  } catch (err) {
    
    return "Error occurred in adding user";
  }
};


const updateUser = async (userId, userDetails) => {
  try {
    

    const validUserDetails = allowedPropertiesOnly(userDetails, allowedProperties)
    return await userModel.updateUser(userId, validUserDetails);
  } catch (err) {
    console.log(err)
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
