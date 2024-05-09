const riderModel = require("../model/rider.model");
const { allowedPropertiesOnly } = require("../utils/util");

const getAllRiders = async () => {
  const riders = await riderModel.getAllRiders();
  return riders;
};

const getOneRider = async (rider_id) => {
  try {
    const data = await riderModel.getOneRider(rider_id);
    if (data) {
      return data;
    } else {
      return { message: "user not found" };
    }
  } catch (err) {
    return { message: `Error occurred getting rider: ${err}` };
  }
};

const addRider = async (user_id, vehicle_id) => {
  const riderAdd = await riderModel.addRider(user_id, vehicle_id);
  if (riderAdd) {
    return riderAdd;
  } else {
    return { message: "rider not added" };
  }
};

const updateRider = async (riderDetails) => {
  const allowedProperties = ["rider_id, vehicle_id"];
  try {
    const validRiderDetails = await allowedPropertiesOnly(
      riderDetails,
      allowedProperties
    );
    const riderUpdate = await riderModel.updateRider(validRiderDetails);
    if (riderUpdate) {
      return riderUpdate;
    } else {
      console.log(riderUpdate.message);
      return { message: "rider details not updated" };
    }
  } catch (err) {
    return { message: `Error occurred updating rider details: ${err}` };
  }
};

const deleteRider = async (rider_id) => {
  try {
    const riderDelete = await riderModel.deleteRider(rider_id);
    if (riderDelete) {
      return riderDelete;
    } else {
      return { message: "rider not deleted" };
    }
  } catch (err) {
    return { message: "Error occurred deleting rider" };
  }
};
module.exports = {
  getAllRiders,
  getOneRider,
  addRider,
  updateRider,
  deleteRider,
};
