const express = require('express')
const customerController = require('../../controllers/customer.controller')
const router = express.Router()

router.get('/', customerController.getAllCustomers)

router.get('/find', customerController.oneCustomerQuery)

router.post('/verify', customerController.verifyCustomer)

router.get('/:customerID', customerController.getOneCustomer)


router.post('/', customerController.addCustomer)

router.put('/:customerID', customerController.updateCustomer)

router.delete('/:customerID', customerController.deleteCustomer)

module.exports = {router, }