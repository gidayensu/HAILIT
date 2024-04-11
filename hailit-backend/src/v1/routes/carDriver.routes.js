const express = require('express');
const carDriverController = require('../../controllers/carDriver.controller')

const router = express.Router()

router.get('/', carDriverController.getAllDrivers)

router.get('/:driver_id', carDriverController.getOneDriver)

router.post('/', carDriverController.addDriver)

router.put('/:driver_id', carDriverController.updateDriver)

router.delete('/:driver_id', carDriverController.deleteDriver)

module.exports = {router, }