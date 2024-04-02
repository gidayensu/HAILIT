const { v4: uuid } = require("uuid");
const customerModel = require("./../model/customer.model");

const getAllCustomers = async () => {
  
  const customers = await customerModel.getAllCustomers();
  return customers;
};

const getOneCustomer = async (customerId) => {
  return await customerModel.getOneCustomer(customerId);
};

const oneCustomerQuery = async(customerEmail)=> {
    return await customerModel.oneCustomerQuery(customerEmail)
}

const customerLogin = async (password, customer_id) => {
    return await customerModel.customerLogin(password, customer_id)
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


const updateCustomer = async (customerId, customerDetails) => {
  try {
    return await customerModel.updateCustomer(customerId, customerDetails);
  } catch (err) {
    
    return "Error. User not updated";
  }
};

const deleteCustomer = async (customerId) => {
  return await customerModel.deleteCustomer(customerId);
};
module.exports = {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getOneCustomer,
  oneCustomerQuery,
  customerLogin
};
