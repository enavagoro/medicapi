import { Router } from 'express'
import { login, googleAuth, googleCallback } from '../controllers/auth.controller'

const router: Router = Router()

const routes = (): void => {
    router.post('/', login)
    router.post('/google/', googleAuth)
    router.post('/google/callback/', googleCallback)
}

routes()

export default router