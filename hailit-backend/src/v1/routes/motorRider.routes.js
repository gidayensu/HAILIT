const express = require('express')
const {getAllMotorRiders, getOneMotorRider, addMotorRider, updateMotorRider, deleteMotorRider} = require('../../controllers/motorRider.controller')
const router = express.Router()

router.get('/', getAllMotorRiders)

router.get('/:motorRiderID', getOneMotorRider)

router.post('/', addMotorRider)

router.put('/:motorRiderID', updateMotorRider)

router.delete('/:motorRiderID', deleteMotorRider)

module.exports = {router, }