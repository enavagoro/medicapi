import { Router } from 'express'
import { list, listByUserId, insert, update, deletePerson, getById } from '../controller/person.controller'
import personValidation from '../../shared/middlewares/schemas/person/index'
import { validJWTNeeded } from '../../shared/middlewares/jwt.validation.middleware'

const router: Router = Router()

const routes = (): void => {
    router.get('/', validJWTNeeded, list)
    router.get('/listByUserId/:userId', validJWTNeeded, listByUserId)
    router.get('/:id', validJWTNeeded, getById)
    router.post('/', validJWTNeeded, personValidation.validateInsertPerson, insert)
    router.patch('/:id', validJWTNeeded, update)
    router.delete('/:id', validJWTNeeded, deletePerson)
}

routes()

export default router
