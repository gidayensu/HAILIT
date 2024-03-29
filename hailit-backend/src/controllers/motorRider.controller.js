const motorRiderService = require('../services/motorRider.service')

const getAllMotorRiders = (req, res)=> {
    const allMotorRiders = motorRiderService.getAllMotorRiders
    res.status(200).json({status: 'OK', data: allMotorRiders})
}

const getOneMotorRider = ()=> {

}

const addMotorRider = ()=> {

}

const updateMotorRider = ()=> {

}

const deleteMotorRider = ()=> {

}
module.exports={getAllMotorRiders, getOneMotorRider, addMotorRider, updateMotorRider, deleteMotorRider}

