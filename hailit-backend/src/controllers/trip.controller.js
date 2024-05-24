const tripService = require("../services/trip.service");
// const { userIsUserRole } = require("../utils/util");

const getAllTrips = async (req, res) => {
  try {
    const allTrips = await tripService.getAllTrips();
    if(allTrips.error) {
      return res.status(400).json({error: allTrips.error})
    }
    res.status(200).json({ trips: allTrips });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
//FIX GETONETRIP AND make driver/rider be able to access it as well as the user
const getOneTrip = async (req, res) => {
  try {
    // const requesterId = req.user.user_id
    
    const { trip_id } = req.params;
    // const oneTrip = await tripService.getOneTrip(trip_id, requesterId);
    const oneTrip = await tripService.getOneTrip(trip_id);
    if (oneTrip.error) {
      return res.status(400).json({error: oneTrip.error})
    }
    res.status(200).json({ trip: oneTrip });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ error: "Server Error Occurred Retrieving Trip Detail" });
  }
};

const getUserTrips = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const userTrips = await tripService.getUserTrips(user_id);
    if (userTrips.error) {
      return res.status(400).json({error: userTrips.error})
    }
    res.status(200).json({ trips: userTrips });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error Occurred Retrieving User Trips" });
  }
};

const addTrip = async (req, res) => {
  ///trip amount, trip_status, driver_id, trip_date, total amount, payment_status, delivery_time, payment_method, dispatcher_rating, rating_comment will be added in the service layer based on certain conditions

  try {
    const { trip_medium, package_type, drop_off_location, pickup_location } =
      req.body;
    if (!trip_medium || !package_type || !drop_off_location || !pickup_location) {
      return res.status(400).json({
        error:
          "Provide all details: trip type, delivery item, and delivery address",
      });
    }

    if (trip_medium) {
      const acceptedTripMediums = ["motor", "car", "truck"];
      const validTripMedium = acceptedTripMediums.includes(trip_medium);
      if (!validTripMedium) {
        return res.status(403).json({ error: "Trip Type Invalid" });
      }
    }
    const tripDetails = req.body;
    // const { user_id } = req.user;
    console.log('REMEMBER TO REMOVE THIS')
    const user_id = '92e6ff67-a1d0-4f56-830c-60d23a63913d';
    const tripAdded = await tripService.addTrip(user_id, tripDetails);
    if (tripAdded.error) {
      return res.status(400).json({error: tripAdded.error} );
    }
    res.status(200).json({trip: tripAdded})
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error Occurred Adding User Trip" });
  }
};

const updateTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const tripDetails = { trip_id, ...req.body };
    const tripUpdate = await tripService.updateTrip(tripDetails);
    if(tripUpdate.error) {
      return res.status(403).json({error: tripUpdate.error})
    }
    
      res.status(200).json({trip: tripUpdate} );
    
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error Occurred Updating User Trip" });
  }
};

const rateTrip = async (req, res) => {
  try {
    
    const ratingDetails = req.body;
    const { trip_id } = req.params;
    const detailsWithId = { trip_id, ...ratingDetails };
    const { dispatcher_rating } = req.body;
    if(typeof dispatcher_rating !== "number") {
      return res.status(403).json({ error: "Rating must be a number" });
    }
    if (!dispatcher_rating ) {
      return res.status(403).json({ error: "Driver/rider details missing" });
    }

    const tripRating = await tripService.rateTrip(detailsWithId);
    if(tripRating.error) {
      return res.status(400).json({error: tripRating.error})
    }
    
      res.status(200).json(tripRating);
    
    
    
  } catch (err) {
    return { error: `Server error, ${err}` };
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const tripDelete = await tripService.deleteTrip(trip_id);
    if (tripDelete) {
      res.status(200).json({ success: "trip deleted" });
    } else {
      res.status(400).json({ error: "trip not deleted" });
    }
  } catch (err) {
    return {error:"Error Occurred; Rider Not Deleted"};
  }
};
module.exports = {
  getAllTrips,
  getOneTrip,
  addTrip,
  updateTrip,
  deleteTrip,
  getUserTrips,
  rateTrip,
};
