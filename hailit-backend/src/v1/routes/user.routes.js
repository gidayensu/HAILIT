const express = require('express')

const userController = require('../../controllers/user.controller')
const authenticateToken = require('../../auth/authToken');
const isAdmin = require('../../auth/isAdmin');
const addingAdminAuth = require('../../auth/user-auth/addingAdminAuth');
const isAdminOrUserAuth = require('../../auth/user-auth/isAdminOrUser');
const isAdminOrRole = require('../../auth/user-auth/isAdminOrRole');

const userRoleValidation = require('../../validation/userRoleValidation')
const router = express.Router()



router.get('/', authenticateToken, isAdminOrRole(), userController.getAllUsers)

router.get('/find', authenticateToken, isAdminOrRole(), userController.getUserIdUsingEmail)

router.post('/login', userController.userLogin)

router.get('/:userId', authenticateToken, isAdminOrUserAuth, userController.getOneUser)

router.post('/register', addingAdminAuth, userController.addUser)

router.put('/:userId', userRoleValidation, authenticateToken, isAdminOrUserAuth, userController.updateUser)

router.delete('/:userId', authenticateToken, isAdminOrRole(), userController.deleteUser)

module.exports = {router, }