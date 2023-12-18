import { Router } from 'express'
import { login } from '../../controller/authController.js'
import { validateLoginDetails } from './loginValidation.js'

export const authRoutes = Router()

authRoutes.post('/login', validateLoginDetails, login)
