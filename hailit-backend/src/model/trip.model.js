const dbFunctions = require("./dBFunctions");

const tripTableName = "trips";
const getAllTrips = async () => {
  try {
    const allTrips = await dbFunctions.getAll(tripTableName);
    if(!allTrips) {
      return {error: "No trip found"}
    }

    return allTrips;
  } catch (err) {
    return {error:"Server Error Occurred"};
  }
};
const getOneTrip = async (trip_id, tripIdColumn) => {
  try {
    const oneTrip = await dbFunctions.getOne(
      tripTableName,
      tripIdColumn,
      trip_id
    );
    if(oneTrip.error) {
      return {error: oneTrip.error}
    }
    return oneTrip[0];
  } catch (err) {
    return {error: "Server Error Occurred"};
  }
};

const getUserTrips = async (id, idColumn, tripColumns) => {
  try {
    const userTrips = await dbFunctions.getSpecificDetailsUsingId(
      tripTableName,
      id,
      idColumn,
      tripColumns
    );
    if (userTrips.error || userTrips.length === 0) {
      return {error: "No user Trip found"}
    }
    return userTrips;
  } catch (err) {
    console.log(err)
    return {error:"Server Error Occurred while getting user trips"};
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
    if(specificTripDetail.error) {
      return {error: "Error occurred retrieving specific details"}
    }
    return specificTripDetail;
  } catch (err) {
    return {error:"Server Error Occurred getting specific trip detail"};
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
    return newTrip[0];
  } catch (err) {
    
    return {error:"Server Error Occurred While Adding Trip"};
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
      const updatedTrip = tripUpdate.rows[0];
      console.log('updatedTrip', updatedTrip)
      if(updatedTrip.error) {
        return { error: "Rider details not updated" };
      }
      
        return updatedTrip;
      
    } catch (err) {
      return { error: `Error occurred in updating rider details ${err}` };
    }
  } catch (err) {
    return {error:"Server Error Occurred"};
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
      return { error: "trip not deleted" };
    }
  } catch (err) {
    return {error:"Error Occurred Deleting Rider"};
  }
};

const dispatcherRateCouIntIncrease = async (tableName, dispatcher_id,  idColumn, columnToBeIncreased) => {
  
  
  const increaseDispatcherRateCount = await dbFunctions.increaseByValue(
    tableName,
    dispatcher_id,
    idColumn,
    columnToBeIncreased
  );
  if(increaseDispatcherRateCount.error) {
    return {error: "Error occurred increasing driver rating count"}
  }
    console.log('increaseDispatcherRateCount:', increaseDispatcherRateCount)
    return increaseDispatcherRateCount;
  
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
    return {error:"Error occurred while confirming user's relation to trip"};
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
  dispatcherRateCouIntIncrease,
};
