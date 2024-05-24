const dbFunctions = require("./dBFunctions");

const userTableName = "users";

const userColumnsForAdding = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
];
const getAllUsers = async () =>{ 
  try {

    const allUsers = await dbFunctions.getAll(userTableName);
    if(!allUsers) {
      return {error: "No user found"}
    }
    return allUsers;
  } catch (err) {
    return {error: "Server error occurred getting all users"}
  }
};


const getOneUser = async (userId) => {
  try {

    const userColumnName = userColumnsForAdding[0];
    const user = await dbFunctions.getOne(userTableName, userColumnName, userId);
    if(user.error) {
      return {error: "User does not exist"}
    }
    return user[0];
  } catch (err) {
    return {error: "error occurred getting user details"}
  }
};

const isUserRole = async (userId, user_role) => {
  const data = await getOneUser(userId);

  
  if (data.user_role === user_role) {
    
    return true;
  } else {
    
    return false;
  }
};

const getUserIdUsingEmail = async (userEmail) => {
  const emailColumnName = userColumnsForAdding[3];
  const userDetails = await dbFunctions.getOne(
    userTableName,
    emailColumnName,
    userEmail
  );

  if (userDetails.error) {
    return {error: "user does not exist"};
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
const numberExists = async (phoneNumber) => {
  const phoneNumberColumn = userColumnsForAdding[4];
  return await dbFunctions.detailExists(
    userTableName,
    phoneNumberColumn,
    phoneNumber
  );
};

//add user METHOD: POST
const addUser = async (userDetails) => {
  const { email } = userDetails;
  const columnsForAdding = Object.keys(userDetails);
  const userDetailsArray = Object.values(userDetails);
  
  try {
    const emailExist = await emailExists(email);
   
    if (!emailExist) {
      const insertUserDetails = await dbFunctions.addOne(
        userTableName,
        columnsForAdding,
        userDetailsArray
      );
    if (insertUserDetails) {
      const insertedDetails = insertUserDetails[0]
      return insertedDetails;
    }
        
      
    } else {
      return { error: "user email or number exists" };
    }
  } catch (err) {
    return { error: "Error occurred" };
  }
};



//update user
const updateUser = async (userId, userDetails) => {
  try {
    
    const { email = "", phone_number = "" } = userDetails;
    const validColumnsForUpdate = Object.keys(userDetails);
    // const validColumnsForUpdate = excludeNonMatchingElements(columnsForUpdate, columnsFromUserDetails);

    const userDetailsArray = Object.values(userDetails);
    const idColumn = userColumnsForAdding[0];

    const idValidation = await dbFunctions.detailExists(
      userTableName,
      idColumn,
      userId
    );

    

    if (idValidation) {
      const userData = await dbFunctions.getOne(
        userTableName,
        idColumn,
        userId
      
      );

      // const userDataValues = Object.values(userData[0] || []);

      if (email !== "") {
        const resultEmail = userData[0].email;

        const emailExist = await emailExists(email);
        if (emailExist && email !== resultEmail) {
          return { error: "User not updated, use a different email" };
        }
      }

      if (phone_number !== "") {
        const resultPhoneNumber = userData[0].phone_number;

        const numberExist = await numberExists(phone_number);
        if (numberExist && phone_number !== resultPhoneNumber) {
          return { error: "phone number is taken user not updated" };
        }
      }

      

      const updateDate = "now()";
      userDetailsArray.splice(userDetailsArray.length - 1, 0, updateDate);

      validColumnsForUpdate.splice(
        validColumnsForUpdate.length - 1,
        0,
        "date_updated"
      );

      //change later. Existing details should not added to the elements to be updated;
      const update = await dbFunctions.updateOne(
        userTableName,
        validColumnsForUpdate,
        userId,
        idColumn,
        ...userDetailsArray
      );
      const updatedDetails = update.rows[0];
        return updatedDetails;
      
    } else {
      return { error: "User Does Not Exist" };
    }
  } catch (err) {
    
    return { error: `Error occurred this error, ${err}` };
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
    return { success: "user deleted" };
  } else {
    return { error: "user does not exist" };
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
  isUserRole,
};
