const dbFunctions = require("./dBFunctions");
const {excludeNonMatchingElements} = require('../utils/util');
const motorRiderModel = require('./motorRider.model');
const carDriverModel = require('./carDriver.model');

const userTableName = "users";
const passwordTable = "password_info";
const passwordTableColumns = ["user_id", "ps_salt", "ps_hash"];


const userColumnsForAdding = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
];
const getAllUsers = () => dbFunctions.getAll(userTableName);

//CLEAN
const getOneUser = async (userId) => {
  const columnName = userColumnsForAdding[0];
  return await dbFunctions.getOne(userTableName, columnName, userId);
};


const getUserIdUsingEmail = async (userEmail) => {
  const columnName = userColumnsForAdding[3];
  const userDetails = await dbFunctions.getOne(
    userTableName,
    columnName,
    userEmail
  );
  
  
  if(userDetails.message){
    return userDetails;
  } else {
  const userId = { user_id: userDetails[0].user_id };
  return userId;
}
};
//check if email exists
const emailExists = async (email) => {
  const columnName = userColumnsForAdding[3];
  return await dbFunctions.detailExists(userTableName, columnName, email);
};

//check if phone number exists
const numberExists = async(phoneNumber) => {
  const phoneNumberColumn = userColumnsForAdding[4];
  return await dbFunctions.detailExists(userTableName, phoneNumberColumn, phoneNumber)
}

//add user METHOD: POST
const addUser = async (userDetails, password) => {
  const {email} = userDetails;
  const {phone_number} = userDetails;
  const {user_id} = userDetails;
  const {user_role} = userDetails;

  const columnsForAdding = Object.keys(userDetails);
  const userDetailsArray = Object.values(userDetails);

  try {
    const emailExist = await emailExists(email);
    const numberExist = await numberExists(phone_number);
    if (!emailExist && !numberExist) {
      const insertUserOtherDetails = await dbFunctions.addOne(
        userTableName,
        columnsForAdding,
        ...userDetailsArray
      );
      if (insertUserOtherDetails) {
        const insertPassword = await dbFunctions.hashPassword(
          user_id,
          password,
          passwordTable,
          passwordTableColumns
        );
        if (insertPassword) {
          //adding rider if rider role set
          if (user_role === "motor_rider") {
            const addMotorRider = await motorRiderModel.addMotorRider(user_id);
            addMotorRider ? {message: "motor rider added"} : {message: "error occurred in adding motor rider"};

          }
          //adding driver if driver role set
          if (user_role === "car_driver") {
            const addCarDriver = await carDriverModel.addDriver(user_id);
            addCarDriver ? {message: "driver added"} : {message: "error occurred in adding driver"};
          }

          return {message: "User added"}
        } else {
          
          const queryText = `delete from ${userTableName} where ${passwordTableColumns[0]} not in (select $1 from ${passwordTable})`;
          const value = [passwordTableColumns[0]];
          await dbFunctions.deleteAccountWithoutPassword(queryText, value);
          return {message: "Error: User not added to database"};
        }
      }
    } else {
      
      return {message: "user email or number exists"};
    }
  } catch (err) {
    
    throw err;
  }
};

const userLogin = async (password, user_id) => {
  const tableDetails = [passwordTable, passwordTableColumns[0]];
  const verifyPassword = await dbFunctions.verifyPassword(password, user_id, tableDetails);
  if(!verifyPassword) {
    return {message: 'wrong email or password', verification_status: false}
  } else {
    const userData = await getOneUser(user_id);
    const exportUserData =  {
      email: userData[0].email,
      first_name: userData[0].first_name,
      last_name: userData[0].last_name,
      phone_number: userData[0].phone_number,
      verification_status: true
    }
    return exportUserData;
  }
};

//update user
const updateUser = async (userId, userDetails) => {
  
  try {
    
    const {email = '', phone_number = ''} = userDetails;
    const validColumnsForUpdate =  Object.keys(userDetails);
    // const validColumnsForUpdate = excludeNonMatchingElements(columnsForUpdate, columnsFromUserDetails);

    const userDetailsArray = Object.values(userDetails);
    const idColumn = userColumnsForAdding[0];
   
    const idValidation = await dbFunctions.detailExists(
      userTableName,
      idColumn,
      userId
    );

    if (idValidation) {
      const result = await dbFunctions.getOne(userTableName, idColumn, userId);
      const resultValues = Object.values(result[0] || []);
      
      if(email!=='') {
        const resultEmail = resultValues[3];
        const emailExist = await emailExists(email);
        if (emailExist && email!==resultEmail) {
          return {message: 'Email is taken. User email not updated'}
        }
      } 
      
      if(phone_number!=='') {
        const resultPhoneNumber = resultValues[4];
        const numberExist = await numberExists(phone_number);
        if (numberExist && phone_number !== resultPhoneNumber) {
          return {message:'phone number is taken user not updated'}
        }
      }
      
        const existingDetails = resultValues.filter((value) =>
        userDetailsArray.includes(value.toString())
        
    );

    
    const updateDate = "now()";
    userDetailsArray.splice(userDetailsArray.length-1, 0, updateDate);
    
    validColumnsForUpdate.splice(validColumnsForUpdate.length-1, 0, 'date_updated')
    
    //change later. Existing details should not added to the elements to be updated;
        const update = await dbFunctions.updateOne(
          userTableName,
          validColumnsForUpdate,
          userId,
          idColumn,
          ...userDetailsArray
        );
        if (existingDetails.length > 0) {
          update;
          return ({detailsNotUpdated: existingDetails,
                  reason: 'same as current details'});
                } else {
                  return update;
                }
   
  
    

    } else {
      
      return {message: "User Does Not Exist"};
    }
  } catch (err) {
    
    return {message: `Error occurred, ${err}`};
  }

  
};

const deleteUser = async (userId) => {
  const columnName = userColumnsForAdding[0];
  const userExists = await dbFunctions.detailExists(
    userTableName,
    columnName,
    userId
  );
  if (userExists) {
    await dbFunctions.deleteOne(userTableName, columnName, userId);
    return {message: "user deleted"};
    
  } else {
    
    return {message: "no account associated with this email or password"};
  }
};
module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  emailExists,
  getUserIdUsingEmail,
  userLogin,
};