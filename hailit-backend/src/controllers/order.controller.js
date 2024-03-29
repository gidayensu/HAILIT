const orderService = require('../services/order.service')

const getAllOrders = (req, res)=> {
    const allOrders = orderService.getAllOrders
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

