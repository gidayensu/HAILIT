const { v4: uuid } = require("uuid");
const customerModel = require("./../model/customer.model");

const getAllCustomers = async () => {
  console.log('this is logged')
  const customers = await customerModel.getAllCustomers();
  return customers;
};

const getOneCustomer = async (customerID) => {
  return await customerModel.getOneCustomer(customerID);
};

const oneCustomerQuery = async(customerEmail)=> {
    return await customerModel.oneCustomerQuery(customerEmail)
}

const verifyCustomer = async (password, customer_id) => {
    return await customerModel.verifyCustomer(password, customer_id)
}

const addCustomer = async (password, customerDetails) => {
  try {
    const customerId = await uuid();
    const passwordPlusId = [password, customerId];
    
    customerDetails.unshift(customerId);
    return customerModel.addCustomer(passwordPlusId, ...customerDetails);
  } catch (err) {
    
    return err;
  }
};


const updateCustomer = async (customerID, customerDetails) => {
  try {
    return await customerModel.updateCustomer(customerID, customerDetails);
  } catch (err) {
    console.log("ERROR", err);
    return "Error. User not updated";
  }
};

const deleteCustomer = async (customerID) => {
  return await customerModel.deleteCustomer(customerID);
};
module.exports = {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getOneCustomer,
  oneCustomerQuery,
  verifyCustomer
};
