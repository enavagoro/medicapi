import { Router } from 'express'
import { list, listByUserId, insert, update, deletePerson, getById, getPersonByPublicCode, changePublicCode } from '../controller/person.controller'
import personValidation from '../../shared/middlewares/schemas/person/index'
import { validJWTNeeded } from '../../shared/middlewares/jwt.validation.middleware'

const router: Router = Router()

const routes = (): void => {
    router.get('/', validJWTNeeded, list)
    router.get('/listByUserId/:userId', listByUserId) // validJWTNeeded
    router.get('/getPersonByPublicCode/:token', getPersonByPublicCode)
    router.get('/:id', getById)
    router.post('/', personValidation.validateInsertPerson, insert)
    router.patch('/:id', update)
    router.delete('/:id', deletePerson)
    router.post('/changePublicCode/:id', changePublicCode)
}

routes()

export default router
