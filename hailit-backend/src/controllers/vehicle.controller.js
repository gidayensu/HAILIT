const vehicleService = require('../services/vehicle.service')

const getAllVehicles = (req, res)=> {
    const allVehicles = vehicleService.getAllVehicles
    res.status(200).json({status: 'OK', data: allVehicles})
}

const getOneVehicle = ()=> {

}

const addVehicle = (req, res)=> {
    const {vehicle_name, vehicle_model, plate_number, vehicle_type} = req.body;
    if (!vehicle_name || vehicle_model || plate_number || vehicle_type) {
        
    }
}

const updateVehicle = ()=> {

}

const deleteVehicle = ()=> {

}
module.exports={getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle}

