const { v4: uuid } = require("uuid");
const userModel = require("../model/user.model");
const driverModel = require("../model/driver.model");
const riderModel = require("../model/rider.model");
const { allowedPropertiesOnly, excludeProperties } = require("../utils/util");

let allowedProperties = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "user_role",
  "onboard"
];

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (err) {
    return {error:"Error occurred in getting all users"};
  }
};

const getOneUser = async (userId) => {
  try {
    const user = await userModel.getOneUser(userId);
    
    if (user.user_role === "driver") {
      const driverDetails = await driverModel.getDriverDetailOnCondition(
        "user_id",
        userId
      );
      
      //if user is driver  but no details in database add driver to driver table
      if (!driverDetails.error) {
          const addDriver = await driverModel.addDriver(userId)
          return {...user, driver:addDriver}
      }
      const returnedDriverDetails = driverDetails.rows[0]
      return { ...user, driver: returnedDriverDetails };
      
    }
    if (user.user_role === "rider") {
      const riderDetails = await riderModel.getRiderOnCondition(
        "user_id",
        userId
      );
      
      //if user is rider but no details in database add rider to rider table
      if (riderDetails.rows.length < 1) {
          const addRider = await riderModel.addRider(userId)
          return {...user, rider: addRider}
      }
      const returnedRiderDetails = riderDetails.rows[0]
      return { ...user, rider: returnedRiderDetails };
    }
    
    return user;
  } catch (err) {
    console.log(err)
    return {error:"Error occurred in getting user"};
  }
};

const getUserIdUsingEmail = async (userEmail) => {
  try {
    const user = await userModel.getUserIdUsingEmail(userEmail);
    return user;
  } catch (err) {
    
    return {error:"Error occurred in getting user"};
  }
};


const addUser = async (userDetails) => {
  const user_id_property = "user_id";
  allowedProperties.unshift(user_id_property);
  try {
    const user_id = userDetails.user_id;

    const userDetailsWithId = { user_id, ...userDetails };
    const validUserDetailsWithId = allowedPropertiesOnly(
      userDetailsWithId,
      allowedProperties
    );

    const addedUser = await userModel.addUser(validUserDetailsWithId);
    if (addedUser.error) {
      return {error: addedUser.error}
    }

    if(validUserDetailsWithId.user_role) {
      //add Rider if user_role is rider
      if (validUserDetailsWithId.user_role === "rider") {
        const addRider = await riderModel.addRider(user_id);
        if (addRider.error) {
          return {error: 'error adding rider'}
        }
        const addedRider = addRider[0];
        return {
          ...addedUser, rider: addedRider
        }
      }
      //add Driver if user_role is driver
      if (validUserDetailsWithId.user_role === "driver") {
        const addDriver = await driverModel.addDriver(user_id);
        
        if (addDriver.error) {
          return {error: 'error adding rider'}
        }
        const addedDriver = addDriver[0];
        return {
          ...addedUser, driver: addedDriver
        }
      }
      
    }
  } catch (err) {
    return {error:"Error occurred in adding user"}
  }
};

const updateUser = async (userId, userDetails) => {
  try {
    
    const validUserDetails = allowedPropertiesOnly(
      userDetails,
      allowedProperties
    );
     const updatedDetails = await userModel.updateUser(userId, validUserDetails);
     if (validUserDetails.user_role) {
        
      //adding rider if rider role set
      
      if (validUserDetails.user_role === "rider") {
        //if user is a driver, delete
        const isDriver =  await driverModel.getDriverDetailOnCondition('user_id', userId);
        if (!isDriver.error) {
          const { driver_id } = isDriver[0]
          await driverModel.deleteDriver(driver_id)
        }
        //return rider details
        const riderExists = await riderModel.getRiderOnCondition('user_id', userId);
        if(riderExists.rows.length >= 1) {
          const riderDetails = riderExists.rows[0]
          return {...updatedDetails, rider: riderDetails}
        }
        //add rider if rider does not exist
        const addRider = await riderModel.addRider(userId);
        const addedRiderDetails = addRider[0];
        if(addedRiderDetails.rider_id) {
          
          return {...updatedDetails, rider: addedRiderDetails }
        }
        
      }
      //adding driver if driver role set
      if (validUserDetails.user_role === "driver") {
        //if user is a rider, delete rider records
        const isRider =  await riderModel.getRiderOnCondition('user_id', userId);
        if(isRider.rows.length >= 1) {
          const {rider_id} = isRider.rows[0]
          await riderModel.deleteRider(rider_id)
        }
        //return driver details
        const driverExists = await driverModel.getDriverDetailOnCondition('user_id', userId);
        
        if(!driverExists.error) {
          
          const driverDetails = driverExists[0];
          return {...updatedDetails, driver: driverDetails}
        }
        //add driver if driver does not exist
        const addDriver = await driverModel.addDriver(userId);
        console.log('addDriver:', addDriver)
        const addedDriverDetails = addDriver[0];
        if(addedDriverDetails.driver_id) {
          
          return {...updatedDetails, driver: addedDriverDetails }
        }
      }

      return {...updatedDetails };
    }
    return { ...updatedDetails };
  } catch (err) {
    
    return {error: "Error. User not updated"};
  }
};

const deleteUser = async (userId) => {
  try {
    //user is rider, delete rider
    const isRider =  await riderModel.getRiderOnCondition('user_id', userId);
    
        if(isRider.rows.length >= 1) {
          
          const {rider_id} = isRider.rows[0]
          await riderModel.deleteRider(rider_id)
        }
    //user is driver, delete driver
    const isDriver =  await driverModel.getDriverDetailOnCondition('user_id', userId);
        if (!isDriver.error) {
          const { driver_id } = isDriver[0]
          await driverModel.deleteDriver(driver_id)
        }
      //then delete user 
    return await userModel.deleteUser(userId);
  } catch (err) {
    
    return ({error: 'Error occurred deleting user'})
  }
};
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getOneUser,
  getUserIdUsingEmail,
  
};
