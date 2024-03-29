const express = require('express')
const {getAllDrivers, getOneDriver, addDriver, updateDriver, deleteDriver} = require('../../controllers/carDriver.controller')

const router = express.Router()

router.get('/', getAllDrivers)

router.get('/:driverID', getOneDriver)

router.post('/', addDriver)

router.put('/:driverID', updateDriver)

router.delete('/:driverID', deleteDriver)

module.exports = {router, }