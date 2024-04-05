const vehicleService = require('../services/vehicle.service')
const StatusCodes = require('http-status-codes');

const getAllVehicles = async (req, res)=> {
    try  {
    const allVehicles = await vehicleService.getAllVehicles();
    res.status(200).json({message: 'OK', data: allVehicles})
} catch (err) {
    return {error: err, message: "Server Error"}
}
}

const getOneVehicle = async (req, res)=> {
    const vehicle_id = req.params;
    const getVehicle = await vehicleService.getOneVehicle(vehicle_id);
    if (getVehicle.message !== 'OK') {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "vehicle does not exist"})
    }
    if(getVehicle.message === 'OK') {
        res.status(StatusCodes.OK).json({getVehicle})
    } 
}

const addVehicle = async (req, res)=> {
    const {vehicle_name, vehicle_model, plate_number, vehicle_type} = req.body;
    if (!vehicle_name || !vehicle_model || !plate_number || !vehicle_type) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "all fields are required"})
    }

    const addingVehicleResult = await vehicleService.addVehicle(req.body);
    if (addingVehicleResult) {
        res.status(StatusCodes.OK).json({message: addingVehicleResult})
    } else {
        res.status(StatusCodes.METHOD_FAILURE).json({message: "could not add vehicle"})
    }
}

const updateVehicle = async (req, res)=> {
    
    try {
        const {vehicle_id} = req.params;
    const {vehicle_name, vehicle_model, plate_number, vehicle_type} = req.body;

    if (!vehicle_name && !vehicle_model && !plate_number && !vehicle_type) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Require at least one input"})
    }

    const updatingVehicle = await vehicleService.updateVehicle(vehicle_id, req.body);

    if (updatingVehicle.message === true) {
        res.status(StatusCodes.OK).json({message: "vehicle updated"})
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Error occurred: vehicle not udpated"})
    }

} catch (err) {
    return {message: "Server Error"}
}

}

const deleteVehicle = async (req, res)=> {
    
    try {
        
    const {vehicle_id} = req.params;
    console.log(vehicle_id)
    const deleteVehicle = await vehicleService.deleteVehicle(vehicle_id);
    if (deleteVehicle.message === "vehicle deleted"){
        res.status(StatusCodes.OK).json(deleteVehicle);
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(deleteVehicle);
    }
    } catch (err) {
    return {message: "Server Error"}
}
}
module.exports={getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle}

