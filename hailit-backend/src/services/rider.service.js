const riderModel = require("../model/rider.model");
const { allowedPropertiesOnly } = require("../utils/util");

const getAllRiders = async () => {
  try {
    const riders = await riderModel.getAllRiders();
    return riders;
  } catch (err) {
    return {error: "Error occurred getting all riders"}
  }
};

const getOneRider = async (rider_id) => {
  try {
    const rider = await riderModel.getOneRider(rider_id);
    if (rider.error) {
      return {error: rider.error};
    } 
      return rider;
    
  } catch (err) {
    return { error: `Error occurred getting rider: ${err}` };
  }
};

const addRider = async (user_id, vehicle_id) => {
  const riderAdd = await riderModel.addRider(user_id, vehicle_id);
  if (riderAdd) {
    return riderAdd;
  } else {
    return { error: "rider not added" };
  }
};

const updateRider = async (riderDetails) => {
  
  const allowedProperties = ["rider_id", "vehicle_id", "license_number", "rider_availability"];
  try {
    const validRiderDetails =  allowedPropertiesOnly(
      riderDetails,
      allowedProperties
    );
    const riderUpdate = await riderModel.updateRider(validRiderDetails);
    
    if (riderUpdate) {
      return riderUpdate;
    } else {
      
      return { error: "rider details not updated" };
    }
  } catch (err) {
    return { error: `Error occurred updating rider details: ${err}` };
  }
};

const deleteRider = async (rider_id) => {
  try {
    const riderDelete = await riderModel.deleteRider(rider_id);
    if (riderDelete) {
      return riderDelete;
    } else {
      return { error: "rider not deleted" };
    }
  } catch (err) {
    return { error: "Error occurred deleting rider" };
  }
};
module.exports = {
  getAllRiders,
  getOneRider,
  addRider,
  updateRider,
  deleteRider,
};
