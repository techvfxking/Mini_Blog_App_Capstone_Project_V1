import express from 'express'
import defaultController from '../controllers/defualtController.js'

const defaultRouter = express.Router()

defaultRouter.get('/', defaultController)

export default defaultRouter
