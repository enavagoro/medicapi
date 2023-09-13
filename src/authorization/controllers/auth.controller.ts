import { Request, Response, NextFunction, json } from 'express'
import { emailAndPasswordMatch } from '../services/auth.services'
import { AuthData } from '../../shared/types/types'
import userModel from '../../user/model/user.model'
import { generateToken } from '../../shared/utils/encrypth/jwt.encrypth.utils'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authData: AuthData = { email: req.body.email, password: req.body.password }
        const user = await userModel.getByEmail(authData.email)
        if(!user){
            res.status(500).send('Internal Server Error')
            return
        }

        emailAndPasswordMatch(user.password, authData.password)
        const accessToken = generateToken(user)
        res.status(201).send({accessToken, userId: user._id})
    } catch (error: any) {
        if(error?.message == 'Connect refused, bad credentials'){
            res.status(400).send(error.message)
            return true
        }
        res.status(500).send('Internal Server Error')
    }
}