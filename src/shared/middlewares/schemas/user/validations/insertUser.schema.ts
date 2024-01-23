import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().allow(''),
  password: Joi.string(),
  status: Joi.boolean(),
  isConfirmed: Joi.boolean()
})

export const validateInsertUser = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = userSchema.validate(req.body)

  if(validationResult.error){
    res.status(400).send('Bad Request')
    return true
  }

  next()
}
