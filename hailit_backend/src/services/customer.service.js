const { v4: uuid } = require("uuid");
const customerDb = require("./../model/customer.model");

const getAllCustomers = async () => {
  const customers = await customerDb.getAllCustomers();
  return customers;
};

const getOneCustomer = async (customerID) => {
  return await customerDb.getOneCustomer(customerID);
};

const oneCustomerQuery = async(customerEmail)=> {
    return await customerDb.oneCustomerQuery(customerEmail)
}

const verifyCustomer = async (password, customer_id) => {
    return await customerDb.verifyCustomer(password, customer_id)
}

const addCustomer = async (password, customerDetails) => {
  try {
    const customerId = await uuid();
    const passwordPlusId = [password, customerId];
    customerDetails.unshift(customerId);
    return customerDb.addCustomer(passwordPlusId, ...customerDetails);
  } catch (err) {
    console.log("Details not added");
    return err;
  }
};


const updateCustomer = async (customerID, customerDetails) => {
  try {
    return await customerDb.updateCustomer(customerID, customerDetails);
  } catch (err) {
    console.log("ERROR", err);
    return "Error. User not updated";
  }
};

const deleteCustomer = async (customerID) => {
  return await customerDb.deleteCustomer(customerID);
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
