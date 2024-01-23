import { Router } from 'express'
import { login, googleAuth, googleCallback, registerExternal, loginExternal } from '../controllers/auth.controller'
import { validJWTNeeded } from '../../shared/middlewares/jwt.validation.middleware'

const router: Router = Router()

const routes = (): void => {
    router.post('/', login)
    router.get('/google/', googleAuth)
    router.get('/google/callback/', googleCallback)
    router.get('/registerExternal', validJWTNeeded, registerExternal)
    router.get('/loginExternal', validJWTNeeded, loginExternal)
}

routes()

export default router