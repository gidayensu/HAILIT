const userService = require('../services/user.service')

const getAllUsers = (req, res)=> {
    const allUsers = userService.getAllUsers;
    res.status(200).json({status: 'OK', data: allUsers})
}

const getOneUser = ()=> {

}

const addUser = ()=> {

}

const updateUser = ()=> {

}

const deleteUser = ()=> {

}
module.exports={getAllUsers, getOneUser, addUser, updateUser, deleteUser}

