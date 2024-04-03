const dbFunctions = require("./functions.model");
const tableName = "users";
const passwordTable = "password_info";
const passwordTableColumns = ["user_id", "ps_salt", "ps_hash"];

const columnsToBeUpdated = [
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "date_updated",
];
const columnsForCreation = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
];
const getAllUsers = () => dbFunctions.getAll(tableName);

const getOneUser = async (userId) => {
  const columnName = columnsForCreation[0];
  return await dbFunctions.getOne(tableName, columnName, userId);
};

const oneUserQuery = async (userEmail) => {
  const columnName = columnsForCreation[3];
  const userDetails = await dbFunctions.getOne(
    tableName,
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
  const columnName = columnsForCreation[3];
  return await dbFunctions.detailExists(tableName, columnName, email);
};

//check if phone number exists
const numberExists = async(phoneNumber) => {
  const columnName = columnsForCreation[4];
  return await dbFunctions.detailExists(tableName, columnName, phoneNumber)
}

//add user METHOD: POST
const addUser = async (passwordPlusId, ...args) => {
  const email = args[3];
  const phoneNumber = args[4];

  try {
    const emailExist = await emailExists(email);
    const numberExist = await numberExists(phoneNumber);
    if (!emailExist && !numberExist) {
      const insertUserOtherDetails = await dbFunctions.addOne(
        tableName,
        columnsForCreation,
        ...args
      );
      if (insertUserOtherDetails) {
        const insertPassword = await dbFunctions.hashPassword(
          passwordPlusId,
          passwordTable,
          passwordTableColumns
        );
        if (insertPassword) {
          
          return {message: "User added"}
        } else {
          
          const queryText = `delete from ${tableName} where ${passwordTableColumns[0]} not in (select $1 from ${passwordTable})`;
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
    const [, , email, phone_number] = userDetails;
    console.log('email:', email)  

    const idColumn = "user_id";
   
    const idValidation = await dbFunctions.detailExists(
      tableName,
      columnsForCreation[0],
      userId
    );

    if (idValidation) {
      const result = await dbFunctions.getOne(tableName, idColumn, userId);
      const resultValues = Object.values(result[0] || []);

      const emailExist = await emailExists(email);
      const numberExist = await numberExists(phone_number);
      if (emailExist && email!=resultValues[3]) {
        return {message: 'Email is taken. User not updated'}
      }

      else if (numberExist && phone_number != resultValues[4]) {
        return {message:'phone number is taken user not updated'}
      }
      else 
      {
        const existingDetails = resultValues.filter((value) =>
        userDetails.includes(value.toString())
    );
    
    const updateDate = "now()";
        userDetails.push(updateDate);

        const update = await dbFunctions.updateOne(
          tableName,
          columnsToBeUpdated,
          userId,
          ...userDetails
        );
        if (existingDetails.length > 0) {
          update;
          return ({detailsNotUpdated: existingDetails,
                  reason: 'same as current details'});
                } else {
                  return update;
                }
   
  }
    

    } else {
      
      return {message: "User Does Not Exist"};
    }
  } catch (err) {
    
    return {message: `Error occurred, ${err}`};
  }

  
};

const deleteUser = async (userId) => {
  const columnName = columnsForCreation[0];
  const userExists = await dbFunctions.detailExists(
    tableName,
    columnName,
    userId
  );
  if (userExists) {
    await dbFunctions.deleteOne(tableName, columnName, userId);
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
  oneUserQuery,
  userLogin,
};