const express = require('express');
const riderController = require('../../controllers/rider.controller');
const router = express.Router();
const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');

router.get('/', authenticateToken, isAdmin, riderController.getAllRiders)

router.get('/:rider_id', authenticateToken, riderController.getOneRider)

router.post('/', riderController.addRider)

router.put('/:rider_id', authenticateToken, riderController.updateRider)

router.delete('/:rider_id', authenticateToken, isAdmin, riderController.deleteRider);

module.exports = {router, }