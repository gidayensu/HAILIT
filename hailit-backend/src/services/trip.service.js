const tripModel = require("../model/trip.model");
const { v4: uuid } = require("uuid");
const driverModel = require("../model/driver.model");
const riderModel = require("../model/rider.model");
const userModel = require("../model/user.model");
const { allowedPropertiesOnly } = require("../utils/util");

const tripColumns = [
  "trip_medium, trip_status, delivery_item, pickup_location, delivery_address, special_instructions, trip_request_date, trip_cost, payment_status, payment_method ",
];
// const allowedTripStatus = ['requested', 'in progress', 'completed', 'cancelled'];
const allowedAddTripProperties = [
  "trip_medium",
  "delivery_item",
  "pickup_location",
  "delivery_address",
  "special_instructions",
];

const getAllTrips = async () => {
  try {
    const allTrips = await tripModel.allTrips();
    return allTrips;
  } catch (err) {
    return "Error Occurred in getting Trips Detail";
  }
};

const getOneTrip = async (trip_id) => {
  try {
    const tripIdColumn = "trip_id";
    const oneTrip = await tripModel.getOneTrip(trip_id, tripIdColumn);

    return oneTrip;
  } catch (err) {
    return "Error Occurred in getting Trip Detail";
  }
};

const getUserTrips = async (user_id) => {
  //FIX THE ERROR. SINCE YOU ARE FETCHING ALL TRIPS, {driver_id} = driverTrips will not work
  try {
    const userData = await userModel.getOneUser(user_id);

    if (userData.message === "detail does not exist") {
      return "No Data";
    }
    const user_role = userData[0].user_role;

    if (user_role === "client") {
      const idColumn = "user_id";
      const userTrips = await tripModel.getUserTrips(
        user_id,
        idColumn,
        tripColumns
      );
      return userTrips;
    }

    if (user_role === "driver" || user_role === "rider") {
      const tripColumns = [
        "trip_id, trip_medium, trip_status, delivery_address, delivery_item, trip_commencement_date, trip_completion_date",
      ];

      //driver is used to represent drivers and riders except user role
      let driverData = await driverModel.getDriverDetailOnCondition(
        "user_id",
        user_id
      );
      let driver_id = driverData[0].driver_id;
      user_role === "rider"
        ? (driverData = await riderModel.getRiderOnCondition(
            "user_id",
            user_id
          ))
        : "";
      user_role === "rider" ? (driver_id = driverData[0].rider_id) : "";

      const idColumn = "driver_id"; //this is because driver is used to represent rider and driver in the trips table
      const driverTrips = await tripModel.getUserTrips(
        driver_id,
        idColumn,
        tripColumns
      );
      return driverTrips;
    }
  } catch (err) {
    console.log(err);
    return "Error occurred getting user trips details";
  }
};
const addTrip = async (user_id, tripDetails) => {
  try {
    const trip_id = uuid();
    const validTripDetails = allowedPropertiesOnly(
      tripDetails,
      allowedAddTripProperties
    );
    const trip_cost = 89 - 45; //current destination - delivery destination
    let driver_id = "";

    const availableDrivers = await driverModel.getSpecificDrivers(
      "driver_availability",
      "available"
    );

    !availableDrivers
      ? (driver_id = "no driver available")
      : (driver_id = availableDrivers[0].driver_id);

    const tripStatusDetails = {
      trip_status: "requested",
      trip_request_date: "now()",
      driver_id: driver_id,
      trip_cost: trip_cost,
      payment_status: false,
      payment_method: "payment on delivery",
    };

    const finalTripDetails = {
      trip_id,
      user_id,
      ...validTripDetails,
      ...tripStatusDetails,
    };
    const newTrip = await tripModel.addTrip(finalTripDetails);
    if (newTrip) {
      return { message: "trip added" };
    }
  } catch (err) {
    console.log(err);
    return "Server Error Occurred Adding  User Trip";
  }
};

const updateTrip = async (tripDetails) => {
  const allowedProperties = [
    "trip_id",
    "trip_medium",
    "trip_status",
    "delivery_item",
    "pickup_location",
    "delivery_address",
    "special_instructions",
    "trip_commencement_date",
    "trip_completion_date",
    "payment_status",
    "payment_method",
    "driver_id",
  ];

  try {
    const validTripDetails = allowedPropertiesOnly(
      tripDetails,
      allowedProperties
    );
    const tripUpdate = await tripModel.updateTrip(validTripDetails);

    if (tripUpdate) {
      return tripUpdate;
    } else {
      return "Trip not updated";
    }
  } catch (err) {
    return "Server Error Occurred Updating Trip";
  }
};

const rateTrip = async (ratingDetails) => {
  try {
    const { trip_id, driver_id } = ratingDetails;
    console.log("driver_id:::", driver_id);
    const updateTrip = await tripModel.updateTrip(ratingDetails);
    console.log("updateTrip::::", updateTrip);
    if (updateTrip === "detail updated") {
      const tripIdColumn = "trip_id";
      const tripMediumColumn = "trip_medium";
      const tripMedium = await tripModel.getSpecificDetailsUsingId(
        trip_id,
        tripIdColumn,
        tripMediumColumn
      );

      const averageRating = "AVG(driver_rating)";
      const driverIdColumn = "driver_id";
      const excludeZeroRating = 0;
      const cumulative_driver_rating =
        await tripModel.getSpecificDetailsUsingId(
          driver_id,
          driverIdColumn,
          averageRating,
          excludeZeroRating
        );
      console.log("cumulative_driver_rating:", cumulative_driver_rating);
      if (tripMedium === "motor") {
        const rider_id = driver_id;
        const updateRiderRating = await riderModel.updateRider({
          cumulative_driver_rating,
          rider_id,
        });

        if (updateRiderRating) {
          const driverRatingCountIncrease =
            await tripModel.driverRateCouIntIncrease(driver_id, tripMedium);
          driverRatingCountIncrease
            ? "trip updated with rating"
            : "trip not updated with rating";
        } else {
          return "Error occurred updating trip rate";
        }
      }

      const updateDriverRating = await driverModel.updateDriver({
        cumulative_driver_rating,
        driver_id,
      });

      console.log("updateDriverRating:", updateDriverRating);
      if (updateDriverRating) {
        return "trip updated with rating";
      } else {
        return "trip not updated with rating";
      }
    }
  } catch (err) {
    console.log(err);
    return "Server Error Occurred Adding Rating";
  }
};

const deleteTrip = async (trip_id) => {
  try {
    const tripDelete = await tripModel.deleteRider(trip_id);
    if (tripDelete) {
      return tripDelete;
    } else {
      return { message: "trip not deleted" };
    }
  } catch (err) {
    return { message: "Error occurred deleting trip" };
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

