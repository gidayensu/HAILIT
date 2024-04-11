const motorRiderModel = require('../model/motorRider.model');
const { allowedPropertiesOnly } = require( "../utils/util");

const getAllRiders = async ()=> {
    const riders = await motorRiderModel.getAllRiders();
    return riders;
}


const getOneRider = async (rider_id)=> {
    try {
    const data = await motorRiderModel.getOneRider(rider_id);
    if(data) {
        return data;
    } else {
        return {message: "user not found"}
    }
    } catch (err) {
        return {message: `Error occurred getting rider: ${err}`}
    }
}

const addRider = async (user_id, vehicle_id)=>  {
    const riderAdd = await motorRiderModel.addRider(user_id, vehicle_id);
    if(riderAdd) {
        return riderAdd
    } else {
        return {message: "rider not added"}
    }
}

const updateRider = async(riderDetails)=> {
    const allowedProperties = ['rider_id, vehicle_id'];
    try {
    const validRiderDetails = await allowedPropertiesOnly(riderDetails, allowedProperties);
    const riderUpdate = await motorRiderModel.updateRider(validRiderDetails);
    if(riderUpdate) {
        
        return riderUpdate
    } else {
        console.log(riderUpdate.message)
        return {message: "rider details not updated"};
    }
    } catch (err) {
        return {message: `Error occurred updating rider details: ${err}`}
    }
}

const deleteRider = async (rider_id) => {
    const riderDelete = await motorRiderModel.deleteRider(rider_id);
    if (riderDelete) {
        return riderDelete;
    } else {
        return {message: "rider not deleted"}
    }
    
}
module.exports={getAllRiders, getOneRider, addRider, updateRider, deleteRider}