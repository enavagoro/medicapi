import { Router } from 'express'
import { list, listByUserId, insert, update, deletePet, getById, getPetByPublicCode, changePublicCode, generateQRCode } from '../controller/pet.controller'
import { isSameUser, validJWTNeeded } from '../../shared/middlewares/jwt.validation.middleware'

const router: Router = Router()

const routes = (): void => {
    router.get('/', list)
    router.get('/listByUserId/:userId', listByUserId)
    router.get('/getPetByPublicCode/:token', getPetByPublicCode)
    router.get('/:id',isSameUser, getById)
    router.post('/', insert)
    router.patch('/:id', update)
    router.delete('/:id', deletePet)
    router.post('/changePublicCode/:id', changePublicCode)
    router.post('/generateQRCode', generateQRCode)
}

routes()

export default router
