const vehicleService = require("../services/vehicle.service");
const StatusCodes = require("http-status-codes");

const getAllVehicles = async (req, res) => {
  try {
    const allVehicles = await vehicleService.getAllVehicles();
    res.status(200).json({ vehicles: allVehicles });
  } catch (err) {
    return { error:  "Server Error" };
  }
};

const getOneVehicle = async (req, res) => {
  const vehicle_id = req.params;
  const getVehicle = await vehicleService.getOneVehicle(vehicle_id);
  if (getVehicle.error) {
    return res
      .status(400)
      .json({ error: "vehicle does not exist" });
  }
  
    res.status(200).json({vehicle: getVehicle });
  
};

const addVehicle = async (req, res) => {
  const { vehicle_name, vehicle_model, plate_number, vehicle_type } = req.body;
  if (!vehicle_name || !vehicle_model || !plate_number || !vehicle_type) {
    return res
      .status(403)
      .json({ error: "all fields are required" });
  }

  const addingVehicleResult = await vehicleService.addVehicle(req.body);
  if (addingVehicleResult) {
    res.status(200).json({ success: addingVehicleResult });
  } else {
    res
      .status(403)
      .json({ error: "could not add vehicle" });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const { vehicle_name, vehicle_model, plate_number, vehicle_type } =
      req.body;

    if (!vehicle_name && !vehicle_model && !plate_number && !vehicle_type) {
      return res
        .status(403)
        .json({ error: "Require at least one input" });
    }

    const updatingVehicle = await vehicleService.updateVehicle(
      vehicle_id,
      req.body
    );

    if(updatingVehicle.error) {
      return res.status(403).json({ error: "Error occurred: vehicle not updated" });
    }
      res.status(200).json({ vehicle: updatingVehicle });
    
  } catch (err) {
    return { error: "Server Error" };
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    
    const deleteVehicle = await vehicleService.deleteVehicle(vehicle_id);
    
    if (deleteVehicle.error) {
      return res.status(200).json({error: "Error occurred deleting vehicle"});
    } 
      res.status(403).json(deleteVehicle);
    
  } catch (err) {
    return { error: "Server Error" };
  }
};
module.exports = {
  getAllVehicles,
  getOneVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
