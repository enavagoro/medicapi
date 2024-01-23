import * as dotenv from 'dotenv'
dotenv.config()

const nimaFront = process.env.NIMA_FRONT_URL || 'http://localhost:8100'

export const getUrlLoginExternal = (token: string | undefined) => {
    if(!token){
        throw new Error('Missing token code.');
    }
    return `${nimaFront}/login-external?code=${token}`
}

export const getUrlRegisterExternal = (token: string | undefined) => {
    if(!token){ 
        throw new Error('Missing token code.');
    }
    return `${nimaFront}/register-external?code=${token}`
}