const express = require('express')
const tripController = require('../../controllers/trip.controller')
const authenticateToken = require('../../auth/authToken');
const isAdminOrUser = require('../../auth/user-auth/isAdminOrUser');
const isUserRole = require('../../auth/user-auth/isUserRole');
const tripAuth = require('../../auth/trip-auth/tripAuth');


const router = express.Router()

router.get('/',  tripController.getAllTrips);

router.get('/user-trip/:trip_id',  tripController.getOneTrip);

router.get('/user-trips/:user_id',  tripController.getUserTrips)

router.post('/add',  tripController.addTrip)

router.put('/:trip_id',  tripController.updateTrip)

router.put('/rate-trip/:trip_id',  tripController.rateTrip)

router.delete('/:trip_id',  tripController.deleteTrip)
// router.get('/', authenticateToken, isUserRole, tripController.getAllTrips);

// router.get('/user-trip/:trip_id', authenticateToken, tripAuth, tripController.getOneTrip);

// router.get('/user-trips/:user_id', authenticateToken, tripAuth, tripController.getUserTrips)

// router.post('/add', authenticateToken, tripController.addTrip)

// router.put('/:trip_id', authenticateToken, tripAuth, tripController.updateTrip)

// router.put('/rate-trip/:trip_id', authenticateToken, tripAuth, tripController.rateTrip)

// router.delete('/:trip_id', authenticateToken, isUserRole, tripController.deleteTrip)

module.exports = {router, }