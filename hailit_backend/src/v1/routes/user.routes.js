const express = require('express')
const {getAllUsers, getOneUser, addUser, updateUser, deleteUser} = require('../../controllers/user.controller')
const router = express.Router()

router.get('/', getAllUsers)

router.get('/:userID', getOneUser)

router.post('/', addUser)

router.put('/:userID', updateUser)

router.delete('/:userID')

module.exports = {router, deleteUser}