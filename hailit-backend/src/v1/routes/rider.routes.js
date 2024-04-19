const express = require('express');
const riderController = require('../../controllers/rider.controller');
const router = express.Router();
const authenticateToken = require('../../auth/authToken');

const isAdminOrRole = require('../../auth/user-auth/isAdminOrRole');
const isAdminOrRider = require('../../auth/rider-auth/isAdminOrRider')

router.get('/', authenticateToken, isAdminOrRole(), riderController.getAllRiders)

router.get('/:rider_id', authenticateToken, riderController.getOneRider)

router.post('/', riderController.addRider)

router.put('/:rider_id', authenticateToken, isAdminOrRider, riderController.updateRider)

router.delete('/:rider_id', authenticateToken, isAdminOrRole(), riderController.deleteRider);

module.exports = {router, }