const crypto = require("crypto");
const { DB } = require("./connectDb");
const getAll = async (tablename) => {
  try {
    const allItems = await DB.query(`SELECT * FROM ${tablename}`);
    const allJSON = allItems.rows;
    return allJSON;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//check if a detail exists
const detailExists = async (tableName, columnName, entry) => {
  try {
    const queryText = `select * from ${tableName} where ${columnName} =$1`;
    const value = [entry];
    const result = await DB.query(queryText, value);
    return result;
  } catch (err) {
    console.log("ERROR");
  }
};

//check for only one detail and return boolean

const checkOneDetail = async (tableName, columnName, entry) => {
  try {
    const result = await detailExists(tableName, columnName, entry);
    return result.rowCount > 0;
  } catch (err) {
    console.log("ERROR");
  }
};

//get one item from the table
const getOne = async (tableName, columnName, customerID) => {
  try {
    if (await checkOneDetail(tableName, columnName, customerID)) {
      const queryText = `select customer_id, first_name, last_name, email, phone_number from ${tableName} where ${columnName} =$1`;
      const value = [customerID];
      const result = await DB.query(queryText, value);
      return result.rows;
    } else {
      console.log("User does not exist");
      return "User does not exist";
    }
  } catch (err) {
    console.log("Error");
    throw err;
  }
};

const addOne = async (tableName, columns, ...args) => {
  const placeholders = args.map((_, index) => "$" + (index + 1)).join(", ");
  const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
  try {
    const result = await DB.query(queryText, args);
    console.log(result.rowCount, "rows affected");
    return result.rowCount > 0;
  } catch (err) {
    console.log(`Could not insert into table ${tableName}`, err);
    return "could not add user to database";
  }
};

const hashPassword = async (passwordPlusId, passwordTable, columns) => {
  //generate a random salt
  try {
    const [password, customerId] = passwordPlusId;
    const salt = await crypto.randomBytes(16).toString("hex");
  
    //hash the password with salt using the PBKDF2 algorithm
    const hash = await crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const values = [customerId, salt, hash];

    const queryText = `INSERT INTO ${passwordTable} (${columns}) values ($1, $2, $3) RETURNING *`;
    const result = await DB.query(queryText, values);
    return result.rowCount > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const verifyPassword = async (enteredPassword, customer_id, tableDetails) => {
  const customerID = customer_id.toString();

  //const customer_id = '56cce05e-5b4a-496e-991b-be1a66981bb6';
  //console.log(`${customerID}`===customer_id)
  const [passwordTable, tableColumn] = tableDetails;
  const queryText = `SELECT * from ${passwordTable} where ${tableColumn} = $1`;
  const result = await DB.query(queryText, [`${customerID}`]);
  const storedHash = await result.rows[0].ps_hash;
  const storedSalt = await result.rows[0].ps_salt;

  const hash = await crypto
    .pbkdf2Sync(enteredPassword, storedSalt, 1000, 64, "sha512")
    .toString("hex");
  if (storedHash === hash) {
    console.log("password correct");
    return true;
  } else {
    console.log("pasword incorrect");
    return false;
  }
};

const updateOne = async (
  tableName,
  columns,
  id,
  ...details
) => {
  try {
    for (let i = 0; i < details.length; i++) {
      const queryText =
        await `UPDATE ${tableName} SET ${columns[i]} = $1 WHERE customer_id = $2`;
      const values = [details[i], id];
      await DB.query(queryText, values);
    }
    return "user updated";
  } catch (err) {
    console.log("Error in updating userDetails", err);
    return "Error in updating user details";
  }
};
//check if the user email is same as old email

const takenDetail = async (tableName, columnName, valueOne) => {
  try {
  const result = await detailExists(tableName, columnName, valueOne);
  if (result.rows.length > 0){
  const [resultObject] = result.rows;
  const resultValues = Object.values(resultObject)
  
  const valueExists = await resultValues.find((value) => {
    value === valueOne ? true: false;
  })
  console.log('this is ', valueExists)
  if (valueExists) {
    return true;
  } else {
    return false;
  }
} else {
  return false
}
} catch(err) {
  console.log('Error',err)
  throw err;
}
};

const deleteOne = async (tableName, columnName, customerID) => {
  try {
    const queryText = `delete from ${tableName} where ${columnName} = $1`;
    const values = [customerID];
    await DB.query(queryText, values);
  } catch (err) {
    console.log("Error deleting user");
    throw err;
  }
};

const deleteAccountWithoutPassword = async (queryText, value) => {
  try {
    await DB.query(queryText, value);
    console.log("no password users deleted");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getAll,
  addOne,
  updateOne,
  deleteOne,
  detailExists,
  hashPassword,
  getOne,
  deleteAccountWithoutPassword,
  checkOneDetail,
  takenDetail,
  verifyPassword,
};
