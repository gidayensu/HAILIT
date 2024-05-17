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
    return false;
  }
};

//get one item from the table. //consider using a better approach that does not repeat itself
const getOne = async (tableName, columnName, entry) => {
  console.log("tableName, columnName, entry:", tableName, columnName, entry);
  try {
    const result = await checkOneDetail(tableName, columnName, entry);

    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return { message: "detail does not exist" };
    }
  } catch (err) {
    throw err;
  }
};

//...args changed to args
const addOne = async (tableName, columns, values) => {
  console.log("values:", values);
  const placeholders = values.map((_, index) => "$" + (index + 1)).join(", ");
  const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
  try {
    await DB.query("BEGIN");
    const result = await DB.query(queryText, values);
    await DB.query("COMMIT");
    return result.rows;
  } catch (err) {
    await DB.query("ROLLBACK");
    throw err;
  }
};


const updateOne = async (tableName, columns, id, idColumn, ...details) => {
  try {
    await DB.query("BEGIN");
    for (let i = 0; i < details.length; i++) {
      const queryText =
        await `UPDATE ${tableName} SET ${columns[i]} = $1 WHERE ${idColumn} = $2`;
      const values = [details[i], id];

      await DB.query(queryText, values);
    }
    await DB.query("COMMIT");
    return "detail updated";
  } catch (err) {
    await DB.query("ROLLBACK");
    throw err;
  }
};

const getSpecificDetails = async (tableName, specificColumn, condition) => {
  try {
    await DB.query("BEGIN");
    const queryText = `SELECT * FROM ${tableName} WHERE ${specificColumn} = $1`;
    const value = [condition];
    const { rows } = await DB.query(queryText, value);
    await DB.query("COMMIT");
    return rows;
  } catch (err) {
    await DB.query("ROLLBACK");
    return "Server Error occurred, data not retrieved";
  }
};

const getSpecificDetailsUsingId = async (tableName, id, idColumn, columns) => {
  console.log('columns:', columns)
  try {
    await DB.query("BEGIN");  
    // const columnsString = columns.join(", ");
    const queryText = `SELECT ${columns} FROM ${tableName} WHERE ${idColumn} = $1`;
    const value = [id];
    const { rows } = await DB.query(queryText, value);
    await DB.query("COMMIT");

    return rows;
  } catch (err) {
    console.log(err);
    await DB.query("ROLLBACK");
    return "Server Error occurred, data not retrieved";
  }
};

const deleteOne = async (tableName, columnName, id) => {
  try {
    await DB.query("BEGIN");
    const queryText = `delete from ${tableName} where ${columnName} = $1`;
    const values = [id];
    const deletion = await DB.query(queryText, values);
    await DB.query("COMMIT");
    return deletion.rowCount ? true : false;
  } catch (err) {
    await DB.query("ROLLBACK");
    throw err;
  }
};

const increaseByValue = async (
  tableName,
  id,
  idColumn,
  columnToBeIncreased
) => {
  try {
    DB.query("BEGIN");
    const queryText = `UPDATE ${tableName} SET ${columnToBeIncreased} = ${
      columnToBeIncreased + 1
    } WHERE ${idColumn} =$1`;
    const value = [id];
    const increaseValue = await DB.query(queryText, value);
    DB.query("COMMIT");
    return increaseValue.rowCount ? true : false;
  } catch (err) {
    DB.query("ROLLBACK");
    throw err;
  }
};



module.exports = {
  getAll,
  addOne,
  updateOne,
  deleteOne,
  checkOneDetail,  
  getOne,

  detailExists,
  
  getSpecificDetails,
  getSpecificDetailsUsingId,
  increaseByValue,
};
