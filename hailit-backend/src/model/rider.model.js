const { v4: uuid } = require("uuid");

const dbFunctions = require("./dBFunctions");

const riderTableName = "rider";
const riderColumnsForAdding = ["rider_id", "vehicle_id", "user_id"];

const defaultVehicleId = "04daa784-1dab-4b04-842c-a9a3ff8ae016";

const getAllRiders = async () => dbFunctions.getAll(riderTableName);

const getOneRider = async (rider_id) => {
  try {
    const riderIdColumn = riderColumnsForAdding[0];
    const data = await dbFunctions.getOne(
      riderTableName,
      riderIdColumn,
      rider_id
    );
    if (data) {
      return data;
    } else {
      return { message: "Rider not found" };
    }
  } catch (err) {
    return { message: `Error occurred. Rider not fetched: ${err}` };
  }
};

const getRiderOnCondition = async () => {
  try {
    const riderDetails = await dbFunctions.checkOneDetail(
      columnName,
      condition
    );
    return riderDetails;
  } catch (err) {
    return "No Driver Details Found";
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
    return `Error occurred in retrieving drivers: ${err}`;
  }
};

const addMotorRider = async (user_id) => {
  const rider_id = uuid();
  const riderDetails = [rider_id, defaultVehicleId, user_id];
  const addingMotor = await dbFunctions.addOne(
    riderTableName,
    riderColumnsForAdding,
    ...riderDetails
  );
  if (addingMotor) {
    return true;
  }
};

const updateRider = async (riderDetails) => {
  const { rider_id } = riderDetails;
  const idColumn = riderColumnsForAdding[0];
  const tableColumns = Object.keys(riderDetails);
  const riderDetailsArray = Object.values(riderDetails);

  try {
    const riderUpdate = await dbFunctions.updateOne(
      riderTableName,
      tableColumns,
      rider_id,
      idColumn,
      ...riderDetailsArray
    );
    console.log("riderUpdate:", riderUpdate);
    if (riderUpdate) {
      return riderUpdate;
    } else {
      return { message: "Rider details not updated" };
    }
  } catch (err) {
    return { err: `Error occurred in updating rider details ${err}` };
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
      return { message: "rider not deleted" };
    }
  } catch (err) {
    return "Error Occurred Deleting Rider";
  }
};
module.exports = {
  getAllRiders,
  getOneRider,
  addMotorRider,
  updateRider,
  deleteRider,
  getSpecificRiders,
  getRiderOnCondition,
};
