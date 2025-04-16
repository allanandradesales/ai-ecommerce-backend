
import express from 'express'
import userController from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/api/users')
.get((req, res) => userController.getUsers(req, res))
.put((req, res) => userController.updateUser(req, res))
.post((req, res) => userController.createUser(req, res))

userRouter.route('/api/users/:id')
.get((req, res) => userController.getUser(req, res))
.delete((req, res) => userController.deleteUserById(req, res))

userRouter.route('/login').post((req, res) => userController.login(req, res))
userRouter.route('/createUser').post((req, res) => userController.createUser(req, res))
userRouter.route('/forgotPassword').post((req, res) => userController.forgotPassword(req, res))
userRouter.route('/resetPassword').post((req, res) => userController.resetPassword(req, res))
userRouter.route('/updateUser').put((req, res) => userController.updateUser(req, res))
userRouter.route('/deleteUser').delete((req, res) => userController.deleteUserById(req, res))
userRouter.route('/getUser').get((req, res) => userController.getUser(req, res))
userRouter.route('/getUsers').get((req, res) => userController.getUsers(req, res))
export default userRouter