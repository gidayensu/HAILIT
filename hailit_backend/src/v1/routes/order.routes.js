const express = require('express')
const {getAllOrders, getOneOrder, addOrder, updateOrder, deleteOrder} = require('../../controllers/order.controller')
const router = express.Router()

router.get('/', getAllOrders)

router.get('/:orderID', getOneOrder)

router.post('/', addOrder)

router.put('/:orderID', updateOrder)

router.delete('/:orderID')

module.exports = {router, deleteOrder}