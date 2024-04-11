const express = require('express')
const riderController = require('../../controllers/motorRider.controller')
const router = express.Router()

router.get('/', riderController.getAllRiders)

router.get('/:rider_id', riderController.getOneRider)

router.post('/', riderController.addRider)

router.put('/:rider_id', riderController.updateRider)

router.delete('/:rider_id', riderController.deleteRider)

module.exports = {router, }