
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export const generateToken = (data: any, time?: string): string | undefined => {
    const payload = { data : {
        name : data.name,
        phone : data.phone,
        id : data._id
    } }
    const options = {
        expiresIn: time || '1h', // Set the token to expire in 1 hour
    }

    const jwtSecret = process.env.JTW_SECRET || ''
    const token = jwt.sign(payload, jwtSecret, options)
    return token
}

//token with email to register the person just once

export const generateExternalToken = (data: any): string | undefined => {
    const payload = { data : {
        name : data.name,
        phone : data.phone,
        id : data._id,
        email: data.email,
        external: true,
    } }
    const options = {
        expiresIn: '3m', // Set the token to expire in 5min
    }

    const jwtSecret = process.env.JTW_SECRET || ''
    const token = jwt.sign(payload, jwtSecret, options)
    return token
}