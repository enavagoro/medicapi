import { Router } from 'express'
import { login } from '../controllers/auth.controller'

const router: Router = Router()

const routes = (): void => {
    router.post('/', login)
}

routes()

export default router