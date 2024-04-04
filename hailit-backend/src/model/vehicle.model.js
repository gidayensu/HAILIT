const {v4: uuid} = require('uuid');
const dbFunctions = require('./dBFunctions');

const tableName = "vehicle";
const columnsForUpdate = ["vehicle_name", "vehicle_model", "plate_number", "vehicle_type"];
const columnsForAdding = ["vehicle_id", ...columnsForUpdate];
const vehicleIdColumn = columnsForAdding[0];


const getAllVehicles = async ()=> {
   try {
    const allVehicles = await dbFunctions.getAll(tableName);
    return allVehicles;
    } catch (err) {
        return {error: err, message: "server error"}
     }

}

const getOneVehicle = async (vehicleId)=> {
    try {
    const {vehicle_id} = vehicleId;
    
    const getVehicle = await dbFunctions.getOne(tableName, vehicleIdColumn, vehicle_id);
    if (getVehicle.message) {
        return "Vehicle does not exist";
    }
    
    return getVehicle[0];
 } catch (err) {
    return {error: err, message: "server error"}
 }
}


const addVehicle = async (completeVehicleDetails)=> {
    const {vehicle_id, vehicle_name, vehicle_model, plate_number, vehicle_type} = completeVehicleDetails;
    try {
        const vehicleExists = await dbFunctions.detailExists(tableName, columnsForAdding[3], plate_number);
        
        if (vehicleExists) {
            return {message: "Vehicle exists. It has already been added"}
        }
        const addResult = await dbFunctions.addOne(tableName, columnsForAdding, vehicle_id, vehicle_name, vehicle_model, plate_number, vehicle_type);
        if (addResult) {
            return {message: "vehicle added"}
        } else {
            return {message: "Could not add vehicle"}
        }
         
    } catch (err) {
        return {message: "Error occurred"}
    }
}

const updateVehicle = async (vehicleUpdateDetails)=> {
    const {vehicle_id, vehicle_name, vehicle_model, plate_number, vehicle_type} = vehicleUpdateDetails;

}

const deleteVehicle = async (vehicle_id) => {
    try {
        const vehicleDeletion = await dbFunctions.deleteOne(tableName, vehicleIdColumn, vehicle_id )
        
        return vehicleDeletion;
    } catch (err) {
        return {error: err, message: "Server error, vehicle not deleted"}
    }
    
}

module.exports = {getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle}
