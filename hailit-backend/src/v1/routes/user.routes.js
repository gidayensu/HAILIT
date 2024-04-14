const express = require('express')

const userController = require('../../controllers/user.controller')
const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');

const router = express.Router()



router.get('/', authenticateToken, isAdmin, userController.getAllUsers)

router.get('/find', authenticateToken, isAdmin, userController.getUserIdUsingEmail)

router.post('/login', userController.userLogin)

router.get('/:userId', authenticateToken, userController.getOneUser)

router.post('/register', userController.addUser)

router.put('/:userId', authenticateToken, userController.updateUser)

router.delete('/:userId', authenticateToken, isAdmin, userController.deleteUser)

module.exports = {router, }