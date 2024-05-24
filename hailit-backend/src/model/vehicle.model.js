const { v4: uuid } = require("uuid");
const dbFunctions = require("./dBFunctions");

const tableName = "vehicle";
const columnsForUpdate = [
  "vehicle_name",
  "vehicle_model",
  "plate_number",
  "vehicle_type",
];
const columnsForAdding = ["vehicle_id", ...columnsForUpdate];
const vehicleIdColumn = columnsForAdding[0];

const getAllVehicles = async () => {
  try {
    const allVehicles = await dbFunctions.getAll(tableName);
    return allVehicles;
  } catch (err) {
    return { error: `Error occurred, ${err} ` };
  }
};

const getOneVehicle = async (vehicleId) => {
  try {
    const { vehicle_id } = vehicleId;

    const getVehicle = await dbFunctions.getOne(
      tableName,
      vehicleIdColumn,
      vehicle_id
    );
    if (getVehicle.error) {
      return {error:"Vehicle does not exist"};
    }

    return getVehicle[0];
  } catch (err) {
    return { error: `Error occurred, ${err} ` };
  }
};

const addVehicle = async (completeVehicleDetails) => {
  const {
    vehicle_id,
    vehicle_name,
    vehicle_model,
    plate_number,
    vehicle_type,
  } = completeVehicleDetails;
  try {
    const vehicleExists = await dbFunctions.detailExists(
      tableName,
      columnsForAdding[3],
      plate_number
    );

    if (vehicleExists) {
      return { error: "Vehicle exists. It has already been added" };
    }
    const addResult = await dbFunctions.addOne(
      tableName,
      columnsForAdding,
      vehicle_id,
      vehicle_name,
      vehicle_model,
      plate_number,
      vehicle_type
    );
    if (addResult) {
      return { success: "vehicle added" };
    } else {
      return { error: "Could not add vehicle" };
    }
  } catch (err) {
    return { error: "Error occurred" };
  }
};

const updateVehicle = async (vehicle_id, vehicleUpdateDetails) => {
  const validColumnsForUpdate = Object.keys(vehicleUpdateDetails);
  const vehicleDetails = Object.values(vehicleUpdateDetails);
  const vehicleIdColumn = columnsForAdding[0];
  

  try {
    const vehicleUpdate = await dbFunctions.updateOne(
      tableName,
      validColumnsForUpdate,
      vehicle_id,
      vehicleIdColumn,
      ...vehicleDetails
    );

    if (vehicleUpdate === "detail updated") {
      return true;
    }
  } catch (err) {
    return { error: `Error occurred, ${err} ` };
  }
};

const deleteVehicle = async (vehicle_id) => {
  try {
    const vehicleDeletion = await dbFunctions.deleteOne(
      tableName,
      vehicleIdColumn,
      vehicle_id
    );

    return vehicleDeletion;
  } catch (err) {
    return { error: `Error occurred, ${err} ` };
  }
};

module.exports = {
  getAllVehicles,
  getOneVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
