const {v4: uuid} = require('uuid');
const { DB } = require('./connectDb');
const dbFunctions = require('./functions.model')

const getAllUsers = ()=> dbFunctions.getAll('users')

const getOneUser = ()=> {

}

const addUser = ()=> {

}

const updateUser = ()=> {

}

const deleteUser = () => {
    
}

module.exports = {getAllUsers, getOneUser, addUser, updateUser, deleteUser}