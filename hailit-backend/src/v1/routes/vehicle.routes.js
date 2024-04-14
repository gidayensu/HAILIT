const express = require('express')
const {getAllVehicles, getOneVehicle, addVehicle, updateVehicle, deleteVehicle} = require('../../controllers/vehicle.controller')
const router = express.Router()

const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');

router.get('/', authenticateToken, isAdmin, getAllVehicles)

router.get('/:vehicle_id', authenticateToken, isAdmin, getOneVehicle)

router.post('/add', authenticateToken, isAdmin, addVehicle)

router.put('/:vehicle_id', authenticateToken, isAdmin, updateVehicle)

router.delete('/:vehicle_id', authenticateToken, isAdmin, deleteVehicle)

module.exports = {router}