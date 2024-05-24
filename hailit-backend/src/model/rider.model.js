const { v4: uuid } = require("uuid");

const dbFunctions = require("./dBFunctions");

const riderTableName = "rider";
const riderColumnsForAdding = ["rider_id", "vehicle_id", "user_id"];

const defaultVehicleId = "04daa784-1dab-4b04-842c-a9a3ff8ae016";

const getAllRiders = async () => {
  try {

    const allRiders = await dbFunctions.getAll(riderTableName);
    console.log('allRiders:', allRiders)
    return allRiders;
  } catch (err) {
    return ({error: "Server error occurred getting all uses"})
  }
  ;}

const getOneRider = async (rider_id) => {
  try {
    const riderIdColumn = riderColumnsForAdding[0];
    const rider = await dbFunctions.getOne(
      riderTableName,
      riderIdColumn,
      rider_id
    );
    if(!rider) {
      return { error: "Rider not found" };
    }
    
      return rider[0];
    
    
    
  } catch (err) {
    return { error: `Error occurred. Rider not fetched: ${err}` };
  }
};

const getRiderOnCondition = async (columnName, condition) => {
  try {
    const riderDetails = await dbFunctions.checkOneDetail(
      riderTableName,
      columnName,
      condition
    );
    return riderDetails;
  } catch (err) {
    return {error:"No Driver Details Found"};
  }
};

const getSpecificRiders = async (specificColumn, condition) => {
  try {
    const specificRiders = await dbFunctions.getSpecificDetails(
      riderTableName,
      specificColumn,
      condition
    );
    return specificRiders;
  } catch (err) {
    return {error:`Error occurred in retrieving drivers: ${err}`};
  }
};

const addRider = async (user_id) => {
  try {

    const userIsRider = await dbFunctions.getSpecificDetailsUsingId(riderTableName, user_id, 'user_id', 'rider_id');
    if(userIsRider.length >= 1) {
      return {error: "User is rider"}
    }
    const rider_id = uuid();
    const riderDetails = [rider_id, defaultVehicleId, user_id];
    const addingMotor = await dbFunctions.addOne(
      riderTableName,
      riderColumnsForAdding,
      riderDetails
    );
    if (addingMotor) {
      return addingMotor;
    }
  } catch (err) {
    return {error: "Error occurred adding rider"}
  }
};

const updateRider = async (riderDetails) => {
  const { rider_id } = riderDetails;
  const idColumn = riderColumnsForAdding[0];
  const tableColumns = Object.keys(riderDetails);
  const riderDetailsArray = Object.values(riderDetails);

  console.log('riderDetailsArray:', riderDetails)

  try {
    const riderUpdate = await dbFunctions.updateOne(
      riderTableName,
      tableColumns,
      rider_id,
      idColumn,
      ...riderDetailsArray
    );
    
    if (riderUpdate.rowCount ===0) {
      return { error: "Rider details not updated" };
    }
    return riderUpdate.rows[0];
  } catch (err) {
    return { error: `Error occurred in updating rider details ${err}` };
  }
};

const deleteRider = async (rider_id) => {
  try {
    const riderDelete = await dbFunctions.deleteOne(
      riderTableName,
      riderColumnsForAdding[0],
      rider_id
    );
    if (riderDelete) {
      return riderDelete;
    } else {
      return { error: "rider not deleted" };
    }
  } catch (err) {
    return {error:"Error Occurred Deleting Rider"};
  }
};
module.exports = {
  getAllRiders,
  getOneRider,
  addRider,
  updateRider,
  deleteRider,
  getSpecificRiders,
  getRiderOnCondition,
};
