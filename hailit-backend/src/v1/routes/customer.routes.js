const express = require('express')
const jwt = require('jsonwebtoken')
const customerController = require('../../controllers/customer.controller')

const router = express.Router()



router.get('/', customerController.getAllCustomers)

router.get('/find', customerController.oneCustomerQuery)

router.post('/login', customerController.customerLogin)

router.get('/:customerId', customerController.getOneCustomer)


router.post('/register', customerController.addCustomer)

router.put('/:customerId', customerController.updateCustomer)

router.delete('/:customerId', customerController.deleteCustomer)

module.exports = {router, }