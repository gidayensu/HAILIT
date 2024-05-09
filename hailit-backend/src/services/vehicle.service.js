const { v4: uuid } = require("uuid");
const vehicleModel = require("../model/vehicle.model");

const getAllVehicles = async () => {
  try {
    const allVehicles = await vehicleModel.getAllVehicles();
    console.log("all", allVehicles);
    return allVehicles;
  } catch (err) {
    return { error: err, message: "server error" };
  }
};

const getOneVehicle = async (vehicle_id) => {
  const getVehicle = await vehicleModel.getOneVehicle(vehicle_id);

  if (getVehicle.vehicle_name) {
    return {
      ...getVehicle,
      message: "OK",
    };
  } else {
    return { message: "Not Found" };
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

    if (addVehicleResult) {
      return addVehicleResult.message;
    }
  } catch (err) {
    console.log(err);
    return { message: "Error occurred. Vehicle not added" };
  }
};

const updateVehicle = async (vehicle_id, vehicleUpdateDetails) => {
  try {
    const updateVehicle = await vehicleModel.updateVehicle(
      vehicle_id,
      vehicleUpdateDetails
    );
    if (updateVehicle) {
      return { message: updateVehicle };
    } else {
      return { message: "not updated" };
    }
  } catch (err) {
    return { message: "Server Error" };
  }
};

const deleteVehicle = async (vehicle_id) => {
  try {
    const deleteVehicle = await vehicleModel.deleteVehicle(vehicle_id);
    if (deleteVehicle) {
      return { message: "vehicle deleted" };
    } else {
      return { message: "Vehicle does not exist. No vehicle deleted" };
    }
  } catch (err) {
    return { error: err, message: "Vehicle not deleted. Server Error" };
  }
};
module.exports = {
  getAllVehicles,
  getOneVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
