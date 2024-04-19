const dbFunctions = require('./dBFunctions')

const tripTableName = 'trips'
const getAllTrips = async ()=> 

{
    try {
        dbFunctions.getAll(tripTableName)
    } catch (err) {
        return "Server Error Occurred";
    }
    
}
const getOneTrip = async (trip_id, tripIdColumn)=> {
    try {
    
    const oneTrip = await dbFunctions.getOne(tripTableName, tripIdColumn, trip_id);
    return oneTrip;
    } catch (err) {
        
        return "Server Error Occurred";
    }
}

const getUserTrips = async (user_id, tripColumns)=> {
    try {
        //console.log('tripColumns:', tripColumns)
    const user_id_column = 'user_id';
    const userTrips = await dbFunctions.getSpecificDetailsUsingId(tripTableName, user_id, user_id_column, tripColumns);
    return userTrips;

    } catch (err) {
        
        return "Server Error Occurred while getting user trips";
    }
}

const getSpecificDetailsUsingId = async (user_id, idColumn, returningColumn) => {
    try {
        
        const specificTripDetail = await dbFunctions.getSpecificDetailsUsingId(tripTableName, user_id, idColumn, returningColumn);
        return specificTripDetail;
    } catch (err) {
        return "Server Error Occurred getting specific trip detail"
    }
    

}


const addTrip = async (tripDetails)=> {
try {
    const tripColumns = Object.keys(tripDetails).join(', ');
    const tripDetailsValues = Object.values(tripDetails);
    const newTrip = await dbFunctions.addOne(tripTableName, tripColumns, tripDetailsValues);
    return newTrip;
} catch (err) {
    console.log(err)
    return "Server Error Occurred While Adding Trip";
}
}

const updateTrip = async ()=> {
    try {

    } catch (err) {
        return "Server Error Occurred";
    }
}

const deleteTrip = async () => {
    try {

    } catch (err) {
        return "Server Error Occurred";
    }
}

const associatedWithTrip = async (trip_id, roleIdColumn) => {
    
    const tripIdColumn = 'trip_id';
    
    try {
        const tripData = await getSpecificDetailsUsingId(trip_id, tripIdColumn, roleIdColumn);
        
        if(!tripData) {
            return false;
        }

        return tripData;
        // if(tripData[0].user_id === user_id) {
        //   return true;
        // } else {
        //   return false;
        // }
    } catch (err) {
        
        return "Error occurred while confirming user's relation to trip"
    }

    
  }

module.exports = {getAllTrips, getOneTrip, addTrip, updateTrip, deleteTrip, getUserTrips, getSpecificDetailsUsingId, associatedWithTrip}