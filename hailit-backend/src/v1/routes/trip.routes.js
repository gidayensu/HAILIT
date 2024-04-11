const express = require('express')
const {getAllOrders, getOneOrder, addOrder, updateOrder, deleteOrder} = require('../../controllers/trip.controller')
const router = express.Router()

router.get('/', getAllOrders)

router.get('/:tripID', getOneOrder)

router.post('/', addOrder)

router.put('/:tripID', updateOrder)

router.delete('/:tripID')

module.exports = {router, }