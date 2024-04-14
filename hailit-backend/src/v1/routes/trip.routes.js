const express = require('express')
const tripController = require('../../controllers/trip.controller')
const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');

const router = express.Router()

router.get('/', authenticateToken, isAdmin, tripController.getAllTrips);

router.get('/:trip_id', authenticateToken, tripController.getOneTrip);

router.get('/user-trips/:user_id', authenticateToken, tripController.getUserTrips)

router.post('/add', authenticateToken, tripController.addTrip)

router.put('/:trip_id', authenticateToken, tripController.updateTrip)

router.delete('/:trip_id', authenticateToken, isAdmin, tripController.deleteTrip)

module.exports = {router, }