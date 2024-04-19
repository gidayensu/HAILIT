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
const checkOneDetail = async (tableName, columnName, condition) => {
  try {
    const queryText = `SELECT * FROM ${tableName} WHERE ${columnName} =$1`;
    const value = [condition];
    const result = await DB.query(queryText, value);
    
    return result;
  } catch (err) {
    throw err;
  } 
};

//check for only one detail and return boolean

const detailExists = async (tableName, columnName, detail) => {
  try {
    const result = await checkOneDetail(tableName, columnName, detail);
    return result.rowCount > 0;
  } catch (err) {
    return false;;
  } 
};

//get one item from the table. //consider using a better approach that does not repeat itself
const getOne = async (tableName, columnName, entry) => {
  console.log('tableName, columnName, entry:', tableName, columnName, entry)
  try {
      const result = await checkOneDetail(tableName, columnName, entry)
      
      if (result.rowCount > 0){
      return result.rows;
    }
     else {
      return {message: 'detail does not exist'};
    }
  } catch (err) {
    throw err;
  } 
};

//...args changed to args
const addOne = async (tableName, columns, values) => {
  console.log('values:', values)
  const placeholders = values.map((_, index) => "$" + (index + 1)).join(", ");
  const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
  try {
    await DB.query('BEGIN')
    const result = await DB.query(queryText, values);
    await DB.query('COMMIT')
    return result.rowCount > 0;
  } catch (err) {
    await DB.query('ROLLBACK')
    throw err;
  } 
};

const hashPassword = async (userId, password, passwordTable, columns) => {
  //generate a random salt
  try {
    
    const salt = await crypto.randomBytes(16).toString("hex");

    //hash the password with salt using the PBKDF2 algorithm
    const hash = await crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const values = [userId, salt, hash];
    
    const queryText = `INSERT INTO ${passwordTable} (${columns}) values ($1, $2, $3) RETURNING *`;
    await DB.query('BEGIN')
    const result = await DB.query(queryText, values);
    await DB.query('COMMIT')
    return result.rowCount > 0;
  } catch (err) {
    await DB.query('ROLLBACK')
    throw err;
  } 
};

const verifyPassword = async (enteredPassword, id, tableDetails) => {
  try {
  const stringedId = id.toString();
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
  } } catch (err) {
    return err
  }
};

const updateOne = async (tableName, columns, id, idColumn, ...details ) => {
  try {
    await DB.query('BEGIN')
    for (let i = 0; i < details.length; i++) {
      const queryText =  await `UPDATE ${tableName} SET ${columns[i]} = $1 WHERE ${idColumn} = $2`;
      const values = [details[i], id];
      
      await DB.query(queryText, values);
      
    }
    await DB.query('COMMIT')
    return "detail updated";
  } catch (err) {
    await DB.query('ROLLBACK')
    throw err;
  } 
};

const getSpecificDetails = async (tableName, specificColumn, condition) => {
  try  {
    await DB.query('BEGIN');
    const queryText = `SELECT * FROM ${tableName} WHERE ${specificColumn} = $1`;
    const value = [condition];
    const {rows} = await DB.query(queryText, value);
    await DB.query('COMMIT');
    return rows;
  } catch (err) {
    await DB.query('ROLLBACK')
    return 'Server Error occurred, data not retrieved';
  }
}

const getSpecificDetailsUsingId = async (tableName, id, idColumn, columns) => {
  try {
    await DB.query('BEGIN');
      // const columnsString = columns.join(', ');
      const queryText = await `SELECT ${columns} FROM ${tableName} WHERE ${idColumn} = $1`;
      const value = [id];
      const {rows} = await DB.query(queryText, value);
    await DB.query('COMMIT');
    
    return rows;
  } catch (err) {
    
    await DB.query('ROLLBACK')
    return 'Server Error occurred, data not retrieved';
  }
}

const deleteOne = async (tableName, columnName, id) => {
  try {
    const queryText = `delete from ${tableName} where ${columnName} = $1`;
    const values = [id];
    const deletion = await DB.query(queryText, values);
    console.log('deletion:', deletion)
    return deletion.rowCount ? true : false
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
  getSpecificDetails,
  getSpecificDetailsUsingId,
};
