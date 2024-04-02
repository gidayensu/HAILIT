const dbFunctions = require("./functions.model");
const tableName = "customer";
const passwordTable = "password_info";
const passwordTableColumns = ["customer_id", "ps_salt", "ps_hash"];

const columnsToBeUpdated = [
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "date_updated",
];
const columnsForCreation = [
  "customer_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
];
const getAllCustomers = () => dbFunctions.getAll(tableName);

const getOneCustomer = async (customerId) => {
  const columnName = columnsForCreation[0];
  return await dbFunctions.getOne(tableName, columnName, customerId);
};

const oneCustomerQuery = async (customerEmail) => {
  const columnName = columnsForCreation[3];
  const customerDetails = await dbFunctions.getOne(
    tableName,
    columnName,
    customerEmail
  );
  
  
  if(customerDetails.message){
    return customerDetails;
  } else {
  const customerId = { customer_id: customerDetails[0].customer_id };
  return customerId;
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

//add customer METHOD: POST
const addCustomer = async (passwordPlusId, ...args) => {
  const email = args[3];
  const phoneNumber = args[4];

  try {
    if (!(await emailExists(email)) && !(await numberExists(phoneNumber))) {
      const insertCustomerOtherDetails = await dbFunctions.addOne(
        tableName,
        columnsForCreation,
        ...args
      );
      if (insertCustomerOtherDetails) {
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
          return "Error: User not added to database";
        }
      }
    } else {
      
      return {message: "user email or number exists"};
    }
  } catch (err) {
    
    throw err;
  }
};

const customerLogin = async (password, customer_id) => {
  const tableDetails = [passwordTable, passwordTableColumns[0]];
  const verifyPassword = await dbFunctions.verifyPassword(password, customer_id, tableDetails);
  if(!verifyPassword) {
    return {message: 'wrong email or password', verification_status: false}
  } else {
    const userData = await getOneCustomer(customer_id);
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

//update customer
const updateCustomer = async (customerId, customerDetails) => {
  try {
    const email = customerDetails[2];
    const phoneNumber = customerDetails[3]
    const idColumn = "customer_id";
   

    // const queryText = `select ${columnsToBeUpdated[0]} from customer where customer_id = $1`
    // const idValidation = await DB.query(queryText, [customerId])
    const idValidation = await dbFunctions.detailExists(
      tableName,
      columnsForCreation[0],
      customerId
    );

    if (idValidation) {
      const result = await dbFunctions.getOne(tableName, idColumn, customerId);
      const resultValues = Object.values(result[0] || []);
      
      if (await emailExists(email) && email!=resultValues[3]) {
        return 'Email is taken. User not updated'
      }

      else if (await numberExists(phoneNumber) && phoneNumber != resultValues[4]) {
        return 'phone number is taken user not updated'
      }
      else 
      {
        const existingDetails = resultValues.filter((value) =>
        customerDetails.includes(value.toString())
    );
    
    const updateDate = "now()";
        customerDetails.push(updateDate);

        const update = await dbFunctions.updateOne(
          tableName,
          columnsToBeUpdated,
          customerId,
          ...customerDetails
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
    
    return `Error occurred, ${err}`;
  }

  //dbFunctions.updateOne(tableName, columnsToBeUpdated, ...customerDetails);
};

const deleteCustomer = async (customerId) => {
  const columnName = columnsForCreation[0];
  const userExists = await dbFunctions.detailExists(
    tableName,
    columnName,
    customerId
  );
  if (userExists) {
    await dbFunctions.deleteOne(tableName, columnName, customerId);
    return {message: "user deleted"};
  } else {
    
    return {message: "user does not exist"};
  }
};
module.exports = {
  getAllCustomers,
  getOneCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  emailExists,
  oneCustomerQuery,
  customerLogin,
};
