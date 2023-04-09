const express = require('express')
const {getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle} = require('../../controllers/vehicle.controller')
const router = express.Router()

router.get('/', getAllVehicles)

router.get('/:vehicleID', getOneVehicle)

router.post('/', addVehicle)

router.put('/:vehicleID', updateVehicle)

router.delete('/:vehicleID')

module.exports = {router}