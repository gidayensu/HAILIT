const userModel = require('../model/user.model');
const tripModel = require('../model/trip.model');
const riderModel = require('../model/rider.model');
const driverModel = require('../model/driver.model')

const EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX =  /^\d{10}$/;

 const emailValidator = (email)=> !EMAIL_REGEX.test(email) ? false: true;
        
 const phoneValidator = (phone)=> !PHONE_REGEX.test(phone) ? false: true;

 const excludeNonMatchingElements = (firstArray, secondArray)=> {
   return secondArray.filter(element => firstArray.includes(element))
 }

 const allowedPropertiesOnly = (data, allowedProperties)=> {
   return Object.keys(data)
   .filter(key => allowedProperties.includes(key))
   .reduce((obj, key) => {
     obj[key] = data[key];
     
     return obj;
   }, {});
 }

 const excludeProperties = (data, propertiesToExclude) => {
  return Object.keys(data)
  .filter(key=> !propertiesToExclude.includes(key))
  .reduce((obj, key) => {
    obj[key] = data[key]
    return obj;
  })
 }

 const userIsUserRole = async (user_id, user_role) => {
    return await userModel.isUserRole(user_id, user_role);
 } 

 const associatedWithTrip = async (role_id, trip_id, role) => {
  let roleIdColumn = 'user_id';
  
  if(role === 'driver')  {
    roleIdColumn = 'driver_id'
  }
  const tripData = await tripModel.associatedWithTrip(trip_id, roleIdColumn);
  if(!tripData) {    
    return false;
  }

  if(role ==='driver') {
    
   return tripData[0]?.driver_id === role_id ? true : false;
  }
   
  return tripData[0]?.user_id === role_id ? true : false;

  
  
 }
 
 const riderUserId = async (rider_id)=>{ 
  const riderData =  await riderModel.getOneRider(rider_id);
  return riderData.user_id;

}
 const driverUserId = async (driver_id)=> {
    const driverData = await driverModel.getOneDriver(driver_id);
    return driverData.user_id;
  }

 module.exports = {
    emailValidator, phoneValidator, excludeNonMatchingElements, riderUserId, driverUserId, allowedPropertiesOnly, userIsUserRole, excludeProperties, associatedWithTrip
 }