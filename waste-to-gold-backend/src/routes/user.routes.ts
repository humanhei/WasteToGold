import express from 'express'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.get('/get/:userId', UserController.getUserById)
router.get('/check/username', UserController.checkUsername)
router.post('/signup', UserController.signUpUser)
router.post('/login', UserController.logInUser)
router.post('/verify', UserController.verifyOTP)
router.post('/create', UserController.createUser)

export default router
