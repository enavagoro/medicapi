import { Request, Response, NextFunction, json } from 'express'
import { emailAndPasswordMatch } from '../services/auth.services'
import { AuthData } from '../../shared/types/types'
import userModel from '../../user/model/user.model'
import { generateExternalToken, generateToken } from '../../shared/utils/encrypth/jwt.encrypth.utils'
import { logGoogle, logGoogleCallback } from '../../shared/services/google.auth.services'
import { getUrlLoginExternal, getUrlRegisterExternal } from '../../shared/utils/redirect/redirect.auth.urls'
import { RequestWithJwt, JWTData } from '../../shared/types/types'
import * as jwt from 'jsonwebtoken'
import { generateUnixTimeStamp } from '../../shared/utils/utils'
const jwtSecret = process.env.JTW_SECRET || ''
import { encrypthPassword } from '../../shared/utils/encrypth/encrypth.utils'

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
        const user = await userModel.getByEmail(response.email)

        if (!user) {
            // Create Google User 
            const userObj = { email: response.email, name: response.name, password: '', phone: '' }
            const accessToken = generateExternalToken(userObj)
            const url = getUrlRegisterExternal(accessToken)
            res.redirect(url);
            return true
        }
        const accessToken = generateExternalToken(user)
        const url = getUrlLoginExternal(accessToken)
        res.redirect(url);
    } catch (error) {
        console.error('Error on authentication:', error);
        res.status(500).send('Error on authentication');
    }
};

export const registerExternal = async (req: RequestWithJwt, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
            const authorization = req.headers['authorization'].split(' ')
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send()
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret) as { [key: string]: any }

                const decoded: any = jwt.decode(authorization[1]);
                req.body.jwtData = decoded as JWTData;
                if(!decoded.external){
                    return res.status(401).send()
                }
                const user = decoded.data;
                if (user.id) {
                    delete user.id
                }

                user.password = encrypthPassword(generateUnixTimeStamp(new Date()).toString());
                user.isConfirmed = true;
                const newUser = await userModel.insert(user);

                if (!newUser) {
                    return res.status(403).send()
                }
                const accessToken = generateToken(newUser)
                res.status(201).send({ accessToken, userId: newUser._id })
            }
        } catch (err) {
            console.log('err', err);
            return res.status(403).send()
        }
    } else {
        return res.status(401).send()
    }
}

export const loginExternal = async (req: RequestWithJwt, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
          const authorization = req.headers['authorization'].split(' ')
          if (authorization[0] !== 'Bearer') {
            return res.status(401).send()
          } else {
            req.jwt = jwt.verify(authorization[1], jwtSecret) as { [key: string]: any }
            const decoded: any = jwt.decode(authorization[1]);
            req.body.jwtData = decoded as JWTData;
            if(!decoded.external){
                return res.status(401).send()
            }
            const user = decoded.data;
            const accessToken = generateToken(user)
            res.status(201).send({ accessToken, userId: user.id })
          }
        } catch (err) {
            console.log('err', err);
            return res.status(403).send()
        }
      } else {
        return res.status(401).send()
      }
}