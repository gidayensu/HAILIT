const jwt = require('jsonwebtoken');

const customerService = require("../services/customer.service");
const { emailValidator, phoneValidator } = require( "../utils/util");
require('dotenv').config({path: './../../.env'});


const getAllCustomers = async (req, res) => {
  
  try {
    const allCustomers = await customerService.getAllCustomers();
    if (res && res.status) {
      
      res.status(200).json({ message: allCustomers });
      return;
    }
  } catch (error) {
    
    if (res && res.status) {
      res.status(500).json({ message: "server error" });
    }
  }
};

const customerLogin = async (req, res) => {
  
  try {
  
    const { password, email } = req.body;
    if (!password || !email) {
        res.status(400).json({message: "email or password can't be empty"})
    } else {
    const checkCustomerId = await customerService.oneCustomerQuery(email);
    if (checkCustomerId.customer_id) {
      const {customer_id} = checkCustomerId;
      const verifyCustomer = await customerService.customerLogin(
        password,
        customer_id
      );
      
      if (verifyCustomer.verification_status) {
      //   sessionCustomerId = customer_id;
      // req.session.customer_id = customer_id;
      // req.session.isLoggedIn = true;
      const token = jwt.sign({customer_id}, process.env.JWT_SECRET)
      res.status(200).json({ message: verifyCustomer, token });
      } else {
        res.status(404).json({message: verifyCustomer})  
      } 
    } else {
      // console.log('wrong email/password')
      res.status(404).json({message: 'wrong email or password'})
    }}
  } catch (err) {
    
    res.status(500).json({ message: "server error" });
  }
};

const getOneCustomer = async (req, res) => {
  try {
    const {customerId} = req.params;
    const authHeader = req.headers.authorization;
    console.log('authHeader:',authHeader)
    if (!authHeader) {
      return res.stats(401).json( {message: "Authorization header missing"})
    }
    const token = authHeader.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedToken:', decodedToken)
    if (decodedToken.customer_id === customerId) {
      if (res && res.status) {
        const oneCustomer = await customerService.getOneCustomer(customerId);
        res.status(200).json(oneCustomer);
      }
    } else {
      res.status(401).json({message: 'Access denied'});
    }
    
    // console.log('req.session:',req.session)
    // const { customerId = "" } = await req.params;
    
  } catch (err) {
    console.log(err)
    if (res && res.status) {
      res.status(500).send({ message: "server error" });
    }
  }
};

const oneCustomerQuery = async (req, res) => {
  try {
    const {email } = req.query;
    const customerDetails = await customerService.oneCustomerQuery(email)
    res.status(200).json(customerDetails)
  } catch (err) {
    
    return {message: "Wrong email/Password"};
  }
};

const addCustomer = async (req, res) => {
  
  const { first_name, last_name, email, phone_number, password } = req.body;
  
  
  
  try {
    if (!first_name || !last_name || !email || !phone_number || !password) {
      res.status(200).json({message: "all fields are required"})
    } else if (!emailValidator(email)) {
      res.status(200).json({message: "enter a correct email"})
    } else if (!phoneValidator(phone_number)) {
      res.status(200).json({message: "enter a 10-digit phone number"})
    }

    else {
    const customerDetails = [first_name, last_name, email, phone_number];
    const result = await customerService.addCustomer(password, customerDetails);
    
    // res.setHeader('Set-Cookie', 'logged-in=true')
    res.status(200).json({ message: result });}
  } catch (err) {
    
    res.status(400).json({ message: "Error occurred" });
  }
};
//updating customer
const updateCustomer = async (req, res) => {

  try {
    const { customerId } = req.params;
    const { first_name = '', last_name = '', email = '', phone_number = ''} = req.body;
    const customerDetails = [first_name, last_name, email, phone_number];
    const updateCustomer = await customerService.updateCustomer(
      customerId,
      customerDetails
    );
    res.status(200).json({ message: updateCustomer });
  } catch (err) {
    // console.log("Could not update customer details", err);
    res.status(500).json({ message: "server error" });
  }
};
//deleting customer detail
const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerDelete = await customerService.deleteCustomer(customerId);
    // console.log(customerDelete);
    res.status(200).json({ message: customerDelete });
  } catch (err) {
    // console.log("could not delete customer");
    
    res.status(500).json({ message: "customer not deleted, server error" });
  }
};
//exporting functions
module.exports = {
  getAllCustomers,
  getOneCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  oneCustomerQuery,
  customerLogin
};
