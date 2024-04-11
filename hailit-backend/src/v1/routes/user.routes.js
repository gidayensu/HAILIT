const express = require('express')

const userController = require('../../controllers/user.controller')
const authenticateToken = require('../../auth/authToken');

const router = express.Router()



router.get('/', userController.getAllUsers)

router.get('/find', userController.getUserIdUsingEmail)

router.post('/login', userController.userLogin)

router.get('/:userId', authenticateToken, userController.getOneUser)

router.post('/register', userController.addUser)

router.put('/:userId', userController.updateUser)

router.delete('/:userId', userController.deleteUser)

module.exports = {router, }