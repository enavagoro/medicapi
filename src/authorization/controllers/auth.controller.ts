import { Request, Response, NextFunction, json } from 'express'
import { emailAndPasswordMatch } from '../services/auth.services'
import { AuthData } from '../../shared/types/types'
import userModel from '../../user/model/user.model'
import { generateToken } from '../../shared/utils/encrypth/jwt.encrypth.utils'
import { logGoogle, logGoogleCallback } from '../../shared/services/google.auth.services'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authData: AuthData = { email: req.body.email, password: req.body.password }
        const user = await userModel.getByEmail(authData.email)
        if (!user) {
            res.status(500).send('Internal Server Error')
            return
        }

        emailAndPasswordMatch(user.password, authData.password)
        const accessToken = generateToken(user)
        res.status(201).send({ accessToken, userId: user._id })
    } catch (error: any) {
        if (error?.message == 'Connect refused, bad credentials') {
            res.status(400).send(error.message)
            return true
        }
        res.status(500).send('Internal Server Error')
    }
}

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const authUrl = await logGoogle()
        res.redirect(authUrl);
    } catch (err: any) {
        res.status(500).send('Internal Server Error')
    }
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string | undefined;
        if (!code) {
            throw new Error('Missing auth code.');
        }

        const response = await logGoogleCallback(code)
        console.log('response:', response);
        res.send('Success log');
    } catch (error) {
        console.error('Error on authentication:', error);
        res.status(500).send('Error on authentication');
    }
};