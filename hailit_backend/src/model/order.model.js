const {v4: uuid} = require('uuid');
const { DB } = require('./connectDb');
const dbFunctions = require('./functions.model')

const getAllOrders = ()=> dbFunctions.getAll('orders')

const getOneOrder = ()=> {

}

const addOrder = ()=> {

}

const updateOrder = ()=> {

}

const deleteOrder = () => {
    
}

module.exports = {getAllOrders, getOneOrder, addOrder, updateOrder, deleteOrder}