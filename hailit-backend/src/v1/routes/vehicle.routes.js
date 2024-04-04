const express = require('express')
const {getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle} = require('../../controllers/vehicle.controller')
const router = express.Router()

router.get('/', getAllVehicles)

router.get('/:vehicle_id', getOneVehicle)

router.post('/add', addVehicle)

router.put('/:vehicle_id', updateVehicle)

router.delete('/:vehicle_id', deleteVehicle)

module.exports = {router}