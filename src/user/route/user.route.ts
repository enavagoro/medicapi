
import { Router } from 'express'
import { list, insert, update, deleteUser, getById, passwordRecovery, newPasswordByToken } from '../controller/user.controller'
import { validJWTNeeded } from '../../shared/middlewares/jwt.validation.middleware'
import userValidation from '../../shared/middlewares/schemas/user/index'

const router: Router = Router()

const routes = (): void => {
    router.get('/', validJWTNeeded, list)
    router.post('/', userValidation.validateInsertUser, insert)
    router.post('/passwordRecovery', passwordRecovery)
    router.post('/newPasswordByToken', newPasswordByToken)
    router.patch('/:id', validJWTNeeded, update)
    router.delete('/:id', validJWTNeeded, deleteUser)
    router.get('/:id', getById)
}

routes()

export default router
