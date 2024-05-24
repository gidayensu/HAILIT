const tripModel = require("../model/trip.model");
const crypto = require('crypto')
const driverModel = require("../model/driver.model");
const riderModel = require("../model/rider.model");
const userModel = require("../model/user.model");
const { allowedPropertiesOnly } = require("../utils/util");

const tripColumns = [
  "dispatcher_id, trip_medium, trip_status, package_type, pickup_location, drop_off_location, special_instructions, trip_request_date, trip_cost, payment_status, payment_method "
];
// const allowedTripStatus = ['new', 'in progress', 'completed', 'cancelled'];
const allowedAddTripProperties = [
  "trip_medium",
  "package_type",
  "pickup_location",
  "drop_off_location",
  "special_instructions",
];

const getAllTrips = async () => {
  try {
    const allTrips = await tripModel.getAllTrips();
    if(allTrips.error) {
      return {error: "No trips found"}
    }
    return allTrips;
  } catch (err) {
    console.log(err)
    return {error:"Error Occurred  in getting Trips Detail"};
  }
};

const getOneTrip = async (trip_id) => {
  try {
    const tripIdColumn = "trip_id";
    const oneTrip = await tripModel.getOneTrip(trip_id, tripIdColumn);
    if(oneTrip.error) {
      return {error: oneTrip.error}
    }
    return oneTrip;
  } catch (err) {
    return {error:"Error Occurred in getting Trip Detail"};
  }
};

const getUserTrips = async (user_id) => {
  //FIX THE ERROR. SINCE YOU ARE FETCHING ALL TRIPS, {driver_id} = driverTrips will not work
  try {
    const userData = await userModel.getOneUser(user_id);
    
    if (userData.error) {
      return {error: userData.error};
    }
    const { user_role } = userData;
    
    if (user_role === "customer") {
      const idColumn = "customer_id";
      
      const userTrips = await tripModel.getUserTrips(
        user_id,
        idColumn,
        tripColumns
      );
      
      if(userTrips.error) {
        return {error: userTrips.error}
      }
      return userTrips;
    }
    
    if (user_role === "driver" || user_role === "rider") {
      const tripColumns = [
        "trip_id, trip_medium, trip_status, trip_type, drop_off_location, package_type, trip_commencement_date, trip_completion_date",
      ];
      
      //dispatcher is used to represent drivers and riders except user role
      
      let dispatcherData = {};
      let dispatcher_id = '';
      if (user_role === 'rider'){
      dispatcherData = await riderModel.getRiderOnCondition("user_id", user_id );
      const returnedDispatcherData = dispatcherData.rows[0];
      dispatcher_id = returnedDispatcherData.rider_id;
      }
      
      if (user_role === "driver") {
        dispatcherData = await driverModel.getDriverDetailOnCondition(
          "user_id",
          user_id
        );
        
        dispatcher_id = dispatcherData[0].driver_id;
      }
      console.log('dispatcher_id', dispatcher_id)

      const idColumn = "dispatcher_id"; //this is because dispatcher is used to represent rider and driver in the trips table
      const dispatcherTrips = await tripModel.getUserTrips(
        dispatcher_id,
        idColumn,
        tripColumns
      );
      return dispatcherTrips;
    }
  } catch (err) {
    console.log(err)
    return {error: "Error occurred getting user trips details"};
  }
};


const addTrip = async (user_id, tripDetails) => {
  try {
    const trip_id = crypto.randomBytes(4).toString("hex");
    const validTripDetails = allowedPropertiesOnly(
      tripDetails,
      allowedAddTripProperties
    );
    const trip_cost = 89 - 45; //current destination - delivery destination
    let dispatcher_id = "";

    const availableDrivers = await driverModel.getSpecificDrivers(
      "driver_availability",
      "available"
    );

    const availableRiders = await riderModel.getSpecificRiders("rider_availability", "available");
    if (tripDetails.trip_medium === "car" || tripDetails.trip_medium === "truck") {

      !availableDrivers
        ? (dispatcher_id = "no driver available")
        : (dispatcher_id = availableDrivers[0].driver_id);
    }

    if (tripDetails.trip_medium === "motor") {
      !availableRiders
        ? (dispatcher_id = "no driver available")
        : (dispatcher_id = availableRiders[0].rider_id);
    }
    

    const tripStatusDetails = {
      trip_status: "new",
      trip_request_date: "now()",
      dispatcher_id,
      trip_cost: trip_cost,
      payment_status: false,
      payment_method: "payment on delivery",
    };

    const finalTripDetails = {
      trip_id,
      customer_id: user_id,
      ...validTripDetails,
      ...tripStatusDetails,
    };
    const newTrip = await tripModel.addTrip(finalTripDetails);
    if(newTrip.error) {
      return {error: newTrip.error}
    }

    return newTrip;
    
  } catch (err) {
    
    return {error:"Server Error Occurred Adding  User Trip"};
  }
};

const updateTrip = async (tripDetails) => {
  const allowedProperties = [
    "trip_id",
    "trip_medium",
    "trip_status",
    "trip_type",
    "package_type",
    "package_value",
    "pickup_location",
    "drop_off_location",
    "special_instructions",
    "trip_commencement_date",
    "trip_completion_date",
    "payment_status",
    "payment_method",
    "dispatcher_id",
    "recipient_number",
    "sender_number"
    
  ];

  try {
    const validTripDetails = allowedPropertiesOnly(
      tripDetails,
      allowedProperties
    );
    const tripUpdate = await tripModel.updateTrip(validTripDetails);
    if(tripUpdate.error) {
      return {error: tripUpdate.error}
    }
      return tripUpdate;
    
  } catch (err) {
    return {error:"Server Error Occurred Updating Trip"};
  }
};

const rateTrip = async (ratingDetails) => {
  try {
    const ratingDetailsWithRatingStatus = { ...ratingDetails, rated: true };
    const allowedProperties = ["dispatcher_rating", "trip_id", "dispatcher_id", "rated"];
    const validTripDetails = allowedPropertiesOnly(ratingDetailsWithRatingStatus, allowedProperties);

    const { trip_id, dispatcher_id } = validTripDetails;
    const updateTrip = await tripModel.updateTrip(validTripDetails);
    if (updateTrip.error) {
      return { error: updateTrip.error };
    }

    const tripMedium = await tripModel.getSpecificDetailsUsingId(trip_id, "trip_id", "trip_medium");
    const cumulativeDispatcherRating = await tripModel.getSpecificDetailsUsingId(dispatcher_id, "dispatcher_id", "AVG(dispatcher_rating)");
    const averageDispatcherRating = cumulativeDispatcherRating[0].avg;
    const { trip_medium } = tripMedium[0];

    const ratingUpdate = await updateDispatcherRating(trip_medium, dispatcher_id, averageDispatcherRating);
    if (ratingUpdate.error) {
      return { error: ratingUpdate.error };
    }

    const ratingCountUpdate = await increaseRatingCount(trip_medium, dispatcher_id);
    if (ratingCountUpdate.error) {
      return { error: ratingCountUpdate.error };
    }

    return { success: "trip updated with rating" };
  } catch (err) {
    console.log(err);
    return { error: "Server Error Occurred Adding Rating" };
  }
};

const updateDispatcherRating = async (trip_medium, dispatcher_id, averageDispatcherRating) => {
  if (trip_medium === "motor") {
    const riderUpdate = await riderModel.updateRider({ cumulative_rider_rating: averageDispatcherRating, rider_id: dispatcher_id });
    if (riderUpdate.error) {
      return { error: riderUpdate.error };
    }
  } else if (trip_medium === "car" || trip_medium === "truck") {
    const driverUpdate = await driverModel.updateDriver({ cumulative_driver_rating: averageDispatcherRating, driver_id: dispatcher_id });
    if (driverUpdate.error) {
      return { error: driverUpdate.error };
    }
  }
  return { success: true };
};

const increaseRatingCount = async (trip_medium, dispatcher_id) => {
  let tableName, idColumn, ratingCountColumn;
  if (trip_medium === "motor") {
    tableName = 'rider';
    idColumn = 'rider_id';
    ratingCountColumn = 'rider_rating_count';
  } else if (trip_medium === "car" || trip_medium === "truck") {
    tableName = 'driver';
    idColumn = 'driver_id';
    ratingCountColumn = 'driver_rating_count';
  } else {
    return { error: "Invalid trip medium" };
  }

  const countIncrease = await tripModel.dispatcherRateCouIntIncrease(tableName, dispatcher_id, idColumn, ratingCountColumn);
  if (countIncrease.error) {
    return { error: countIncrease.error };
  }
  return { success: true };
};

const deleteTrip = async (trip_id) => {
  try {
    const tripDelete = await tripModel.deleteRider(trip_id);
    if (tripDelete) {
      return tripDelete;
    } else {
      return { error: "trip not deleted" };
    }
  } catch (err) {
    return { error: "Error occurred deleting trip" };
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

