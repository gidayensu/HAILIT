const { v4: uuid } = require("uuid");
const { DB } = require("./connectDb");
const dbFunctions = require("./dBFunctions");

const driverTableName = "driver";
const driverTableColumns = ["driver_id", "user_id", "vehicle_id"];

//CREATE TRIGGER TO DELETE FROM DATABASE WHEN SOMETHIG CHANGES

//   const db = require('./db');

// // Function to create trigger
// async function createTrigger() {
//   const createTriggerQuery = `
//     CREATE OR REPLACE FUNCTION delete_driver_data()
//     RETURNS TRIGGER AS
//     $$
//     BEGIN
//         IF OLD.user_role = 'driver' AND NEW.user_role = 'motor_driver' THEN
//             DELETE FROM driver WHERE user_id = OLD.user_id;
//         END IF;
//         RETURN NEW;
//     END;
//     $$
//     LANGUAGE plpgsql;

//     CREATE TRIGGER after_update_user_role
//     AFTER UPDATE OF user_role ON user_table
//     FOR EACH ROW
//     EXECUTE FUNCTION delete_driver_data();
//   `;

//   try {
//     await db.query(createTriggerQuery);

//   } catch (error) {
//     console.error('Error creating trigger:', error);
//   }
// }

// // Call the function to create the trigger
// createTrigger();

const defaultVehicleId = "04daa784-1dab-4b04-842c-a9a3ff8ae016";

const getAllDrivers = async () =>{ 
 try {

   const allDrivers = dbFunctions.getAll(driverTableName);
   if(!allDrivers) {
    return {error: "No driver found"}
   }
   return allDrivers;
 } catch(err) {
  return {error: "server error occurred getting drivers"}
 }
}

const getOneDriver = async (driver_id) => {
  try {
    const driverIdColumn = driverTableColumns[0];
    const driver = await dbFunctions.getOne(
      driverTableName,
      driverIdColumn,
      driver_id
    );
    if(!driver) {
      return {error: "Driver not found"}
    }

    return driver[0];
  } catch (err) {
    return { error: "Error occurred. Driver not fetched" };
  }
};

const getDriverDetailOnCondition = async (columnName, condition) => {
  try {
    const driverDetails = await dbFunctions.checkOneDetail(
      driverTableName,
      columnName,
      condition
    );
    
    if(driverDetails.rowCount === 0) {

      return {error: "driver detail not found"};
    }

    return driverDetails.rows
  } catch (err) {
    
    return {error:"Error occurred finding driver details"};
  }
};
const getSpecificDrivers = async (specificColumn, condition) => {
  try {
    const specificDrivers = await dbFunctions.getSpecificDetails(
      driverTableName,
      specificColumn,
      condition
    );
    return specificDrivers;
  } catch (err) {
    return {error:`Error occurred in retrieving drivers: ${err}`};
  }
};

const addDriver = async (user_id, vehicle_id) => {
  const driver_id = uuid();
  let driverVehicleId = "";
  vehicle_id
    ? (driverVehicleId = vehicle_id)
    : (driverVehicleId = defaultVehicleId);
  const driverDetails = [driver_id, user_id, driverVehicleId];
  try {
    const addedDriver = await dbFunctions.addOne(
      driverTableName,
      driverTableColumns,
      driverDetails
    );
    if (addedDriver) {
      return addedDriver;
    }
  } catch (err) {
    return { error: "error" };
  }
};

const updateDriver = async (driverDetails) => {
  const { driver_id } = driverDetails;
  const idColumn = driverTableColumns[0];
  const tableColumns = Object.keys(driverDetails);
  const driverDetailsArray = Object.values(driverDetails);

  try {
    const driverUpdate = await dbFunctions.updateOne(
      driverTableName,
      tableColumns,
      driver_id,
      idColumn,
      ...driverDetailsArray
    );
    
    if (driverUpdate.rowCount === 0) {
        return {error: "Driver details not updated"}  
    } 
    return driverUpdate.rows[0];
  } catch (err) {
    return { error: `Error occurred in updating driver details ${err}` };
  }
};

const deleteDriver = async (driver_id) => {
  const driverDelete = await dbFunctions.deleteOne(
    driverTableName,
    driverTableColumns[0],
    driver_id
  );
  if (driverDelete) {
    return driverDelete;
  } else {
    return { error: "driver not deleted" };
  }
};

module.exports = {
  getAllDrivers,
  addDriver,
  updateDriver,
  getOneDriver,
  deleteDriver,
  getSpecificDrivers,
  getDriverDetailOnCondition,
};
