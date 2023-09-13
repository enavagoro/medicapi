import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const personSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  secondLastName: Joi.string(),
  birthDate: Joi.date().required(),
  rut: Joi.string().required(),
  status: Joi.boolean(),
  userId: Joi.string().required(),
  medicalRecord: Joi.object(),
  emergencyContact: Joi.string()
})

export const validateInsertPerson = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = personSchema.validate(req.body)

  if(validationResult.error){
    res.status(400).send('Bad Request')
    return true
  }

  next()
}
