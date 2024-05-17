const dbFunctions = require("./dBFunctions");

const tripTableName = "trips";
const getAllTrips = async () => {
  try {
    dbFunctions.getAll(tripTableName);
  } catch (err) {
    return "Server Error Occurred";
  }
};
const getOneTrip = async (trip_id, tripIdColumn) => {
  try {
    const oneTrip = await dbFunctions.getOne(
      tripTableName,
      tripIdColumn,
      trip_id
    );
    return oneTrip;
  } catch (err) {
    return "Server Error Occurred";
  }
};

const getUserTrips = async (id, idColumn, tripColumns) => {
  try {
    // console.log('tripColumns:', tripColumns)

    const userTrips = await dbFunctions.getSpecificDetailsUsingId(
      tripTableName,
      id,
      idColumn,
      tripColumns
    );
    console.log("userTrips:", userTrips);
    return userTrips;
  } catch (err) {
    console.log(err);
    return "Server Error Occurred while getting user trips";
  }
};

const getSpecificDetailsUsingId = async (
  user_id,
  idColumn,
  returningColumn
) => {
  try {
    const specificTripDetail = await dbFunctions.getSpecificDetailsUsingId(
      tripTableName,
      user_id,
      idColumn,
      returningColumn
    );
    return specificTripDetail;
  } catch (err) {
    return "Server Error Occurred getting specific trip detail";
  }
};

const addTrip = async (tripDetails) => {
  try {
    const tripColumns = Object.keys(tripDetails).join(", ");
    const tripDetailsValues = Object.values(tripDetails);
    const newTrip = await dbFunctions.addOne(
      tripTableName,
      tripColumns,
      tripDetailsValues
    );
    return newTrip;
  } catch (err) {
    console.log(err);
    return "Server Error Occurred While Adding Trip";
  }
};

const updateTrip = async (tripDetails) => {
  try {
    const { trip_id } = tripDetails;
    const tripIdColumn = "trip_id";
    const tableColumns = Object.keys(tripDetails);
    const tripDetailsArray = Object.values(tripDetails);

    try {
      const tripUpdate = await dbFunctions.updateOne(
        tripTableName,
        tableColumns,
        trip_id,
        tripIdColumn,
        ...tripDetailsArray
      );
      console.log("tripUpdate:", tripUpdate);
      if (tripUpdate) {
        return tripUpdate;
      } else {
        return { message: "Rider details not updated" };
      }
    } catch (err) {
      return { err: `Error occurred in updating rider details ${err}` };
    }
  } catch (err) {
    return "Server Error Occurred";
  }
};

const deleteTrip = async (trip_id) => {
  try {
    const tripDelete = await dbFunctions.deleteOne(
      tripTableName,
      tripColumnsForAdding[0],
      trip_id
    );
    if (tripDelete) {
      return tripDelete;
    } else {
      return { message: "trip not deleted" };
    }
  } catch (err) {
    return "Error Occurred Deleting Rider";
  }
};

const driverRateCouIntIncrease = async (driver_id, tripMedium) => {
  let idColumn = "driver_id";
  let columnToBeIncreased = "driver_rating_count";
  if (tripMedium === "motor") {
    idColumn = "rider_id";
    columnToBeIncreased = "rider_rating_count";
  }
  const increaseDriverRateCount = await dbFunctions.increaseByValue(
    tripTableName,
    driver_id,
    idColumn,
    columnToBeIncreased
  );
  if (increaseDriverRateCount === true) {
    return increaseDriverRateCount;
  } else {
    return false;
  }
};

const associatedWithTrip = async (trip_id, roleIdColumn) => {
  const tripIdColumn = "trip_id";

  try {
    const tripData = await getSpecificDetailsUsingId(
      trip_id,
      tripIdColumn,
      roleIdColumn
    );

    if (!tripData) {
      return false;
    }

    return tripData;
    // if(tripData[0].user_id === user_id) {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch (err) {
    return "Error occurred while confirming user's relation to trip";
  }
};

module.exports = {
  getAllTrips,
  getOneTrip,
  addTrip,
  updateTrip,
  deleteTrip,
  getUserTrips,
  getSpecificDetailsUsingId,
  associatedWithTrip,
  driverRateCouIntIncrease,
};
