import { Router } from 'express'
import { login, googleAuth, googleCallback } from '../controllers/auth.controller'

const router: Router = Router()

const routes = (): void => {
    router.post('/', login)
    router.get('/google/', googleAuth)
    router.get('/google/callback/', googleCallback)
}

routes()

export default router