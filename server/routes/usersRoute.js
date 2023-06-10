import express from 'express'
import { signin, signup } from '../controllers/usersController.js'
import { signIn, signUp } from '../utils/actionTypes.js'

const usersRouter = express.Router()

usersRouter.post(signIn, signin)
usersRouter.post(signUp, signup)

export default usersRouter
