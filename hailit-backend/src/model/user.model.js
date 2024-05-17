const dbFunctions = require("./dBFunctions");
const riderModel = require("./rider.model");
const driverModel = require("./driver.model");

const userTableName = "users";

const userColumnsForAdding = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
];
const getAllUsers = () => dbFunctions.getAll(userTableName);


const getOneUser = async (userId) => {
  const userColumnName = userColumnsForAdding[0];
  const data = await dbFunctions.getOne(userTableName, userColumnName, userId);

  return data;
};

const isUserRole = async (userId, user_role) => {
  const data = await getOneUser(userId);
  
  if (data[0].user_role === user_role) {
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

  if (userDetails.message) {
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
      return insertUserDetails
    }
        
      
    } else {
      return { message: "user email or number exists" };
    }
  } catch (err) {
    throw err;
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

      const userDataValues = Object.values(userData[0] || []);

      if (email !== "") {
        const resultEmail = userData[0].email;

        const emailExist = await emailExists(email);
        if (emailExist && email !== resultEmail) {
          return { message: "User not updated, use a different email" };
        }
      }

      if (phone_number !== "") {
        const resultPhoneNumber = userData[0].phone_number;

        const numberExist = await numberExists(phone_number);
        if (numberExist && phone_number !== resultPhoneNumber) {
          return { message: "phone number is taken user not updated" };
        }
      }

      const existingDetails = userDataValues.filter((value) =>
        userDetailsArray.includes(value.toString())
      );

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
      if (userDetails.user_role) {
        //adding rider if rider role set
        if (userDetails.user_role === "rider") {
          const addMotorRider = await riderModel.addMotorRider(userId);
          addMotorRider
            ? { message: "motor rider added" }
            : { message: "error occurred in adding motor rider" };
        }
        //adding driver if driver role set
        if (userDetails.user_role === "driver") {
          const addCarDriver = await driverModel.addDriver(userId);
          addCarDriver
            ? { message: "driver added" }
            : { message: "error occurred in adding driver" };
        }

        return { message: "User added" };
      } 
      if (existingDetails.length > 0) {
        update;
        return {
          detailsNotUpdated: existingDetails,
          reason: "same as current details",
        };
      } else {
        return update;
      }
    } else {
      return { message: "User Does Not Exist" };
    }
  } catch (err) {
    return { message: `Error occurred, ${err}` };
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
    return { message: "user deleted" };
  } else {
    return { message: "no account associated with this email" };
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
