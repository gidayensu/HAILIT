const express = require('express')
const tripController = require('../../controllers/trip.controller')
const authenticateToken = require('../../auth/authToken');
const isAdminOrUser = require('../../auth/user-auth/isAdminOrUser');
const isAdminOrRole = require('../../auth/user-auth/isAdminOrRole');
const tripAuth = require('../../auth/trip-auth/tripAuth');


const router = express.Router()

router.get('/', authenticateToken, isAdminOrRole(), tripController.getAllTrips);

router.get('/user-trip/:trip_id', authenticateToken, tripAuth, tripController.getOneTrip);

router.get('/user-trips/', authenticateToken, tripController.getUserTrips)

router.post('/add', authenticateToken, tripController.addTrip)

router.put('/:trip_id', authenticateToken, tripAuth, tripController.updateTrip)

router.put('/rate-trip/:trip_id', authenticateToken, tripAuth, tripController.updateTrip)

router.delete('/:trip_id', authenticateToken, isAdminOrRole(), tripController.deleteTrip)

module.exports = {router, }