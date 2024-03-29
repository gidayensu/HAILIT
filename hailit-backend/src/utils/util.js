const EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX =  /^\d{10}$/;

 const emailValidator = (email)=> !EMAIL_REGEX.test(email) ? false: true;
        
 const phoneValidator = (phone)=> !PHONE_REGEX.test(phone) ? false: true;

 

 module.exports = {
    emailValidator, phoneValidator
 }