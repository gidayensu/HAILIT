const tripService = require('../services/trip.service')

const getAllOrders = (req, res)=> {
    const allOrders = tripService.getAllOrders
    res.status(200).json({status: 'OK', data: allOrders})
}

const getOneOrder = ()=> {

}

const addOrder = ()=> {

}

const updateOrder = ()=> {

}

const deleteOrder = ()=> {

}
module.exports={getAllOrders, getOneOrder, addOrder, updateOrder, deleteOrder}

