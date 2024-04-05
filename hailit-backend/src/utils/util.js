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

 

 module.exports = {
    emailValidator, phoneValidator, excludeNonMatchingElements, allowedPropertiesOnly
 }