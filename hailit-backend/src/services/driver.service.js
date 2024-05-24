const driverModel = require("../model/driver.model");
const { allowedPropertiesOnly } = require("../utils/util");

const getAllDrivers = async () => {
  try {
    const drivers = await driverModel.getAllDrivers();
    if(drivers.error) {
      return {error: drivers.error}
    }
    return drivers;
  } catch (err) {
    return {error: "server error occurred getting drivers"}
  }
};

const getOneDriver = async (driver_id) => {
  try {
    const driver = await driverModel.getOneDriver(driver_id);
    if (driver.error) {
      return {error: driver.error}
    
    }
    return driver;
  } catch (err) {
    return { error: `Error occurred getting driver: ${err}` };
  }
};

const addDriver = async (user_id, vehicle_id) => {
  const driverAdd = await driverModel.addDriver(user_id, vehicle_id);
  if (driverAdd) {
    return driverAdd;
  } else {
    return { error: "driver not added" };
  }
};

const updateDriver = async (driverDetails) => {
  const allowedProperties = [
    "driver_id",
    "vehicle_id",
    "license_number",
    "driver_availability",
  ];
  try {
    const validDriverDetails = await allowedPropertiesOnly(
      driverDetails,
      allowedProperties
    );
    const driverUpdate = await driverModel.updateDriver(validDriverDetails);
    if (driverUpdate.error) {
      return { error: "driver details not updated" };
    } 
    return driverUpdate;
  } catch (err) {
    return { error: `Error occurred updating driver details: ${err}` };
  }
};

const deleteDriver = async (driver_id) => {
  const driverDelete = await driverModel.deleteDriver(driver_id);
  if (driverDelete) {
    return driverDelete;
  } else {
    return { error: "driver not deleted" };
  }
};
module.exports = {
  getAllDrivers,
  getOneDriver,
  addDriver,
  updateDriver,
  deleteDriver,
};
