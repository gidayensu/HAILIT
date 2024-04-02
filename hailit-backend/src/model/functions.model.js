const crypto = require("crypto");
const { DB } = require("./connectDb");

const getAll = async (tableName) => {
  try {
    const allItems = await DB.query(`SELECT * FROM ${tableName}`);
    const allJSON = allItems.rows;
    return allJSON;
  } catch (err) {
    throw err;
  }
};

//check if a detail exists
const checkOneDetail = async (tableName, columnName, entry) => {
  try {
    const queryText = `select * from ${tableName} where ${columnName} =$1`;
    const value = [entry];
    const result = await DB.query(queryText, value);
    
    return result;
  } catch (err) {
    throw err;
  }
};

//check for only one detail and return boolean

const detailExists = async (tableName, columnName, entry) => {
  try {
    const result = await checkOneDetail(tableName, columnName, entry);
    return result.rowCount > 0;
  } catch (err) {
    return false;;
  }
};

//get one item from the table. //consider using a better approach that does not repeat itself
const getOne = async (tableName, columnName, entry) => {
  try {
      const result = await checkOneDetail(tableName, columnName, entry)
      
      if (result.rowCount > 0){
      return result.rows;
    }
     else {
      return ({message: 'user does not exist'});
    }
  } catch (err) {
    throw err;
  }
};

const addOne = async (tableName, columns, ...args) => {
  const placeholders = args.map((_, index) => "$" + (index + 1)).join(", ");
  const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
  try {
    const result = await DB.query(queryText, args);
    return result.rowCount > 0;
  } catch (err) {
    throw err;
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
   
    throw err;
  }
};

const verifyPassword = async (enteredPassword, id, tableDetails) => {
  const stringedId = id.toString();

  //const customer_id = '56cce05e-5b4a-496e-991b-be1a66981bb6';
  //console.log(`${customerId}`===customer_id)
  const [passwordTable, tableColumn] = tableDetails;
  const queryText = `SELECT * from ${passwordTable} where ${tableColumn} = $1`;
  const result = await DB.query(queryText, [`${stringedId}`]);
  const storedHash = await result.rows[0].ps_hash;
  const storedSalt = await result.rows[0].ps_salt;

  const hash = await crypto
    .pbkdf2Sync(enteredPassword, storedSalt, 1000, 64, "sha512")
    .toString("hex");
  if (storedHash === hash) {
    return true;
  } else {
    return false;
  }
};

const updateOne = async (tableName, columns, id, ...details) => {
  try {
    for (let i = 0; i < details.length; i++) {
      const queryText =
        await `UPDATE ${tableName} SET ${columns[i]} = $1 WHERE customer_id = $2`;
      const values = [details[i], id];
      await DB.query(queryText, values);
    }
    return "user updated";
  } catch (err) {
    throw err;
  }
};
//check if the user email is same as old email


/* const takenDetail = async (tableName, columnName, ...args) => {
  const id = args[0]
  const customerDetailsWithoutId = args.filter(detail=>detail!=id)
  const result = await checkOneDetail(tableName, columnName, id);
  const resultValues = Object.values(result.rows[0] || []);
  const existingValues = resultValues.filter((value) =>
    customerDetailsWithoutId.includes(value.toString())
  );
  return existingValues;
}; */


const deleteOne = async (tableName, columnName, id) => {
  try {
    const queryText = `delete from ${tableName} where ${columnName} = $1`;
    const values = [id];
    await DB.query(queryText, values);
  } catch (err) {
    throw err;
  }
};

const deleteAccountWithoutPassword = async (queryText, value) => {
  try {
    await DB.query(queryText, value);
  } catch (err) {
   
    throw err;
  }
};

module.exports = {
  getAll,
  addOne,
  updateOne,
  deleteOne,
  checkOneDetail,
  hashPassword,
  getOne,
  deleteAccountWithoutPassword,
  detailExists,
  verifyPassword,
};
