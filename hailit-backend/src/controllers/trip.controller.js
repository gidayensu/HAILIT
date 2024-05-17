const tripService = require("../services/trip.service");
// const { userIsUserRole } = require("../utils/util");

const getAllTrips = async (req, res) => {
  try {
    const allTrips = await tripService.getAllTrips;
    res.status(200).json({ data: allTrips });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
//FIX GETONETRIP AND make driver/rider be able to access it as well as the user
const getOneTrip = async (req, res) => {
  try {
    const requesterId = req.user.user_id;
    const { trip_id } = req.params;
    const oneTrip = await tripService.getOneTrip(trip_id, requesterId);
    res.status(200).json({ message: oneTrip });
  } catch (err) {
    console.log(`Error getting one trip: ${err}`);
    return res
      .status(500)
      .json({ message: "Server Error Occurred Retrieving Trip Detail" });
  }
};

const getUserTrips = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    //  const { user_role } = req.user;
    // const isAdmin = await userIsUserRole(user_id, "admin");

    // if (!user_id && !isAdmin) {
    //   return res.status(403).json({ message: "access denied" });
    // }
    const userTrips = await tripService.getUserTrips(user_id);
    res.status(200).json({ data: userTrips });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error Occurred Retrieving User Trips" });
  }
};

const addTrip = async (req, res) => {
  ///trip amount, trip_status, driver_id, trip_date, total amount, payment_status, delivery_time, payment_method, driver_rating, driver_rating_comment will be added in the service layer based on certain conditions

  try {
    const { trip_medium, delivery_item, delivery_address, pickup_location } =
      req.body;
    if (!trip_medium || !delivery_item || !delivery_address || !pickup_location) {
      return res.status(400).json({
        message:
          "Provide all details: trip type, delivery item, and delivery address",
      });
    }

    if (trip_medium) {
      const acceptedTripMediums = ["motor", "car"];
      const validTripMedium = acceptedTripMediums.includes(trip_medium);
      if (!validTripMedium) {
        return res.status(403).json({ message: "Trip Type Invalid" });
      }
    }
    const tripDetails = req.body;
    const { user_id } = req.user;
    const tripAdded = await tripService.addTrip(user_id, tripDetails);
    if (tripAdded.message === "trip added") {
      res.status(200).json({ message: tripAdded.message });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error Occurred Adding User Trip" });
  }
};

const updateTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const tripDetails = { trip_id, ...req.body };
    const tripUpdate = tripService.updateTrip(tripDetails);
    if (tripUpdate.message === "trip updated") {
      res.status(200).json({ message: tripUpdate.message });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error Occurred Updating User Trip" });
  }
};

const rateTrip = async (req, res) => {
  try {
    console.log("this runs");
    const ratingDetails = req.body;
    const { trip_id } = req.params;
    const detailsWithId = { trip_id, ...ratingDetails };
    const { driver_rating } = req.body;
    if (!driver_rating) {
      return res.status(403).json({ message: "Driver/rider details missing" });
    }

    const tripRating = await tripService.rateTrip(detailsWithId);

    if (tripRating === "trip updated with rating") {
      res.status(200).json({ message: "Trip updated with rating" });
    } else {
      res.status(400).json({ message: "Trip not Updated" });
    }
  } catch (err) {}
};

const deleteTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const tripDelete = await tripService.deleteTrip(trip_id);
    if (tripDelete) {
      res.status(200).json({ message: "trip deleted" });
    } else {
      res.status(400).json({ message: "trip not deleted" });
    }
  } catch (err) {
    return "Error Occurred; Rider Not Deleted";
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
