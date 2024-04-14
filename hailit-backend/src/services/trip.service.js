const tripModel = require('../model/trip.model');
const { v4: uuid } = require("uuid");
const driverModel = require('../model/driver.model');
const riderModel = require('../model/rider.model');
const {allowedPropertiesOnly } = require ('../utils/util');

const allowedTripStatus = ['requested', 'in progress', 'completed', 'cancelled'];
const allowedAddTripProperties = ['trip_type', 'delivery_item', 'pickup_location', 'delivery_address', 'special_instructions'];

const getAllTrips = async ()=> {

try { 
    const allTrips = await tripModel.allTrips()
    return allTrips;
} catch (err) {
    return "Error Occurred in getting Trips Detail";
}
    
}

const getOneTrip = async (trip_id, requesterId)=> {

try { 
    const oneTrip = await tripModel.getOneTrip(trip_id);
    const {user_id} = oneTrip;
    if(user_id !== requesterId) {
        return "Not authorized";
    }
    return oneTrip;
} catch (err) {
    return "Error Occurred in getting Trip Detail";
}

}

const getUserTrips = async(user_id, user_role)=> {
    //FIX THE ERROR. SINCE YOU ARE FETCHING ALL TRIPS, {driver_id} = driverTrips will not work
    try {
    
        if (user_role === 'client') {
            
            const userTrips = await tripModel.getUserTrips(user_id, tripColumns);
            return userTrips;
        }

        if (user_role === 'driver' || user_role === 'rider') {
            const tripColumns = ['trip_id, trip_type, trip_status, trip_date, delivery_address, delivery_item, delivery_time, trip_date'];
            const driverTrips = await tripModel.getUserTrips(user_id, tripColumns);
            return driverTrips;
        }

        

    } catch (err) {
        return "Error occurred getting user trips details"
    }
}
const addTrip = async (user_id, tripDetails)=> {
    try {
    const trip_id = uuid();
    const validTripDetails = allowedPropertiesOnly(tripDetails, allowedAddTripProperties);
    const trip_cost = 89 - 45; //current destination - delivery destination
    let driver_id = '';
    
    const availableDrivers = await driverModel.getSpecificDrivers('driver_availability', 'available');

    !availableDrivers ? driver_id = 'no driver available' : driver_id = availableDrivers[0].driver_id;


    const tripStatusDetails = {
        trip_status: 'requested',
        trip_request_date: 'now()',
        driver_id: driver_id,
        trip_cost: trip_cost,
        payment_status: false,
        payment_method: 'payment on delivery',
    }

    const finalTripDetails = {trip_id, user_id, ...validTripDetails, ...tripStatusDetails};
    const newTrip = await tripModel.addTrip(finalTripDetails);
    if (newTrip) {
        return {message: 'trip added'};
    }
} catch (err) {
    console.log(err);
    return 'Server Error Occurred Adding  User Trip';
}
}

const updateTrip = async ()=> {

try { 

} catch (err) {

}

}

const deleteTrip = async () => {

try { 

} catch (err) {

}
    
}
module.exports={ getAllTrips, getOneTrip, addTrip, updateTrip, deleteTrip, getUserTrips}


