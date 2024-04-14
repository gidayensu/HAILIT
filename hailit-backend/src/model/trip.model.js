const {v4: uuid} = require('uuid');
const { DB } = require('./connectDb');
const dbFunctions = require('./dBFunctions')


const tripTableName = 'trips'
const getAllTrips = async ()=> 

{
    try {
        dbFunctions.getAll('trips')
    } catch (err) {
        return "Server Error Occurred";
    }
    
}
const getOneTrip = async ()=> {
    try {

    } catch (err) {
        return "Server Error Occurred";
    }
}

const getUserTrips = async (user_id, tripColumns)=> {
    try {
    const userTrips = await dbFunctions.getSpecificDetailsUsingId(tripTableName, user_id, user_id_column, tripColumns);
    return userTrips;

    } catch (err) {
        return "Server Error Occurred";
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
    return "Server Error Occurred";
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

module.exports = {getAllTrips, getOneTrip, addTrip, updateTrip, deleteTrip, getUserTrips}