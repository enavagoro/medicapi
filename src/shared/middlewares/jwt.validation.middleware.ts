import * as jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import { RequestWithJwt } from '../types/types'
dotenv.config()

const jwtSecret = process.env.JTW_SECRET || ''

export const validJWTNeeded = (req: RequestWithJwt, res: Response, next: NextFunction) => {
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send()
      } else {
        req.jwt = jwt.verify(authorization[1], jwtSecret) as { [key: string]: any }
        return next()
      }
    } catch (err) {
      return res.status(403).send()
    }
  } else {
    return res.status(401).send()
  }
}
