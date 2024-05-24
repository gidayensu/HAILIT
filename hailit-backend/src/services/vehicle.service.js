const { v4: uuid } = require("uuid");
const vehicleModel = require("../model/vehicle.model");

const getAllVehicles = async () => {
  try {
    const allVehicles = await vehicleModel.getAllVehicles();
    
    return allVehicles;
  } catch (err) {
    return { error:  "server error" };
  }
};

const getOneVehicle = async (vehicle_id) => {
  const getVehicle = await vehicleModel.getOneVehicle(vehicle_id);

  if (getVehicle.vehicle_name) {
    return {
      ...getVehicle
    };
  } else {
    return { error: "Not Found" };
  }
};

const addVehicle = async (vehicleDetails) => {
  const vehicle_id = await uuid();

  const completeVehicleDetails = {
    ...vehicleDetails,
    vehicle_id,
  };

  try {
    const addVehicleResult = await vehicleModel.addVehicle(
      completeVehicleDetails
    );

    if (addVehicleResult.error) {
      return {error: "Error occurred in adding vehicle"}
    }
    
      return addVehicleResult;
    
  } catch (err) {
    
    return { error: "Error occurred. Vehicle not added" };
  }
};

const updateVehicle = async (vehicle_id, vehicleUpdateDetails) => {
  try {
    const updateVehicle = await vehicleModel.updateVehicle(
      vehicle_id,
      vehicleUpdateDetails
    );
    if (updateVehicle) {
      return { vehicle: updateVehicle };
    } else {
      return { error: "not updated" };
    }
  } catch (err) {
    return { error: "Server Error" };
  }
};

const deleteVehicle = async (vehicle_id) => {
  try {
    const deleteVehicle = await vehicleModel.deleteVehicle(vehicle_id);
    if (deleteVehicle) {
      return { success: "vehicle deleted" };
    } else {
      return { error: "Vehicle does not exist. No vehicle deleted" };
    }
  } catch (err) {
    return { error: "Vehicle not deleted. Server Error" };
  }
};
module.exports = {
  getAllVehicles,
  getOneVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
