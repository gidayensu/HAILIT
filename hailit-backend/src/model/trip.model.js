
import { addOne, deleteOne, getAll, getOne, getSpecificDetailsUsingId, increaseByValue, updateOne} from "./dBFunctions.js"

const tripTableName = "trips";

export const getAllTripsFromDB = async () => {
  try {
    const allTrips = await getAll(tripTableName);
    if(!allTrips) {
      return {error: "No trip found"}
    }

    return allTrips;
  } catch (err) {
    return {error:`Server Error Occurred in getting all trips from database at the model level: ${err}`};
  }
};
export const getOneTripFromDB = async (trip_id, tripIdColumn) => {
  console.log('this really really runs')
  try {
    const oneTrip = await getOne(
      tripTableName,
      tripIdColumn,
      trip_id
    );
    console.log('OneTrip', oneTrip)
    if(oneTrip.error) {
      return {error: oneTrip.error}
    }
    return oneTrip[0];
  } catch (err) {
    return {error: `Server Error Occurred in getting data from Database: ${err}`};
  }
};

export const getUserTripsFromDB = async (id, idColumn, tripFieldsToSelect) => {
  try {
    const userTrips = await getSpecificDetailsUsingId(
      tripTableName,
      id,
      idColumn,
      tripFieldsToSelect
    );
    if (userTrips.error || userTrips.length === 0) {
      return {error: "No user Trip found"}
    }
    return userTrips;
  } catch (err) {
    
    return {error:"Server Error Occurred while getting user trips"};
  }
};

export const getSpecificTripDetailsUsingIdFromDB = async (
  user_id,
  idColumn,
  returningColumn
) => {
  try {
    const specificTripDetail = await getSpecificDetailsUsingId(
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

export const addTripToDB = async (tripDetails) => {
  try {
    const tripFieldsToSelect = Object.keys(tripDetails).join(", ");
    const tripDetailsValues = Object.values(tripDetails);
    const newTrip = await addOne(
      tripTableName,
      tripFieldsToSelect,
      tripDetailsValues
    );
    return newTrip[0];
  } catch (err) {
    
    return {error:"Server Error Occurred While Adding Trip"};
  }
};

export const updateTripOnDB = async (tripDetails) => {
  try {
    const { trip_id } = tripDetails;
    const tripIdColumn = "trip_id";
    const tableColumns = Object.keys(tripDetails);
    const tripDetailsArray = Object.values(tripDetails);

    try {
      const tripUpdate = await updateOne(
        tripTableName,
        tableColumns,
        trip_id,
        tripIdColumn,
        ...tripDetailsArray
      );
      const updatedTrip = tripUpdate.rows[0];
      
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

export const deleteTripFromDB = async (trip_id) => {
  try {
    const tripDelete = await deleteOne(
      tripTableName,
      tripFieldsToSelectForAdding[0],
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

export const ratingCouIntIncrease = async (tableName, dispatcher_id,  idColumn, columnToBeIncreased) => {
  
  
  const increaseDispatcherRateCount = await increaseByValue(
    tableName,
    dispatcher_id,
    idColumn,
    columnToBeIncreased
  );
  if(increaseDispatcherRateCount.error) {
    return {error: "Error occurred increasing driver rating count"}
  }
    
    return increaseDispatcherRateCount;
  
};

export const associatedWithTrip = async (trip_id, roleIdColumn) => {
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

