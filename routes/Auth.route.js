import { Router } from 'express'
const router = Router()
import {register, login, refreshToken, logout} from '../Controllers/Auth.controller.js'

router.post('/register', register)

router.post('/login', login)

router.post('/refresh-token', refreshToken)

router.delete('/logout', logout)

export default router