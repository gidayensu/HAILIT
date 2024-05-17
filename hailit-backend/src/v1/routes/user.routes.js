const express = require('express')

const userController = require('../../controllers/user.controller')


const addingAdminAuth = require('../../auth/user-auth/addingAdminAuth');
const isUserRole = require('../../auth/user-auth/isUserRole');
const supaAuth = require('../../auth/supaAuth')
const userRoleValidation = require('../../validation/userRoleValidation')
const router = express.Router()



router.get('/', supaAuth.supaAuth, isUserRole, userController.getAllUsers)

router.get('/find', supaAuth.supaAuth, isUserRole, userController.getUserIdUsingEmail)


router.get('/:userId', supaAuth.supaAuth, userController.getOneUser)

router.post('/register', supaAuth.supaAuth, addingAdminAuth, userController.addUser)

router.put('/:userId', userRoleValidation, supaAuth.supaAuth, isUserRole, userController.updateUser)

router.delete('/:userId', supaAuth.supaAuth, isUserRole, userController.deleteUser)

module.exports = {router, }