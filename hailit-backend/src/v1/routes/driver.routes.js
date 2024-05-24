const express = require('express');
const driverController = require('../../controllers/driver.controller');
const authenticateToken = require('../../auth/authToken');
const isUserRole = require('../../auth/user-auth/isUserRole');


const router = express.Router();

router.get('/',  driverController.getAllDrivers);

router.get('/:driver_id', driverController.getOneDriver);

// router.post('/register', driverController.addDriver);

router.put('/:driver_id',  driverController.updateDriver);


router.delete('/:driver_id',  driverController.deleteDriver);
// router.get('/', authenticateToken, isUserRole, driverController.getAllDrivers);

// router.get('/:driver_id', authenticateToken, driverController.getOneDriver);

// router.post('/register', driverController.addDriver);

// router.put('/:driver_id', authenticateToken, driverController.updateDriver);


// router.delete('/:driver_id', authenticateToken, isUserRole, driverController.deleteDriver);

module.exports = {router, }