const vehicleService = require('../services/vehicle.service')

const getAllVehicles = (req, res)=> {
    const allVehicles = vehicleService.getAllVehicles
    res.status(200).json({status: 'OK', data: allVehicles})
}

const getOneVehicle = ()=> {

}

const addVehicle = ()=> {

}

const updateVehicle = ()=> {

}

const deleteVehicle = ()=> {

}
module.exports={getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle}

