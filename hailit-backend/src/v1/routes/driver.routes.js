const express = require('express');
const driverController = require('../../controllers/driver.controller')
const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');

const router = express.Router()

router.get('/', authenticateToken, isAdmin, driverController.getAllDrivers)

router.get('/:driver_id', authenticateToken, driverController.getOneDriver)

router.post('/register', driverController.addDriver)

router.put('/:driver_id', authenticateToken, driverController.updateDriver)

router.delete('/:driver_id', authenticateToken, isAdmin, driverController.deleteDriver)

module.exports = {router, }