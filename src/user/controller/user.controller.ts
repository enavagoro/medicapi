import { Request, Response } from 'express'
import userModel from '../model/user.model'
import { encrypthPassword, generatePasswordToken } from '../../shared/utils/encrypth/encrypth.utils'
import { User } from '../../shared/types/types'
import { sendEmail } from '../../shared/services/mail-server.service'

export const list = async (_: Request, res: Response) => {
    try {
        const response = await userModel.list()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

export const insert = async (req: Request, res: Response) => {
    try {
        const userData: User = req.body
        //first set
        userData.password = encrypthPassword(userData.password)
        userData.status = true
        userData.isConfirmed = false
        // generate recuperation password and confirmation token
        const response = await userModel.insert(userData)
        res.status(201).send(response)
    } catch (error) {
        console.log('Error on insert user:', error)
        res.status(500).send('Internal Server Error')
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const userDataToUpdate = req.body
        const response = await userModel.update(userId, userDataToUpdate)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const response = await userModel.deleteUser(userId)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const response = await userModel.getById(userId)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

export const passwordRecovery = async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email
        const user = await userModel.getByEmail(userEmail)
        if (!user) {
            res.status(500).send(`Operation error or email doesn't exist`)
        }

        const tempPayload = { time: new Date().getTime() }
        const dataString = JSON.stringify(tempPayload)
        const token = generatePasswordToken(dataString)

        user.recoverPasswordToken = token
        await userModel.update(user._id, user)
        await sendEmail(user)
        res.status(200).send({
            statusCode: 200,
            message: 'Operation Succesfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

export const newPasswordByToken = async (req: Request, res: Response) => {
    try {
        const token = req.body.token
        const newPassword = req.body.newPassword

        const user = await userModel.findByPasswordRecoveryToken(token)
        user.password = encrypthPassword(newPassword)
        const newUser = { ...user._doc }
        newUser.recoverPasswordToken = ''
        await userModel.update(user._id, newUser)
        res.status(200).send({
            statusCode: 200,
            message: 'Operation Succesfully'
        })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}
