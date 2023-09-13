import { Schema, model } from 'mongoose'
import { User } from '../../shared/types/types'

let userSchema: any
let userModel: any

const defineMongooseSchema = () => {
    userSchema = new Schema<User>({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: Boolean },
        recoverPasswordToken: { type: String },
        isConfirmed: { type: Boolean },
    }, { timestamps: true })
}

const createMongooseModel = () => {
    userModel = model<User>('User', userSchema)
}

defineMongooseSchema()
createMongooseModel()

/* */

const list = async () => {
    const users = await userModel.find({})
    return users
}

const insert = async (userData: User) => {
    const newUser = new userModel(userData)
    const savedUser = await newUser.save()
    return savedUser
}

const update = async (id: string, dataToUpdate: User) => {
    const updatedUser = await userModel.findByIdAndUpdate(id, dataToUpdate, { new: true })
    return updatedUser
}

const deleteUser = async (id: string) => {
    const deletedUser = await userModel.findByIdAndDelete(id)
    return deletedUser
}

const getById = async (id: string) => {
    const user = await userModel.findById(id)
    return user
}

const getByEmail = async (email: string) => {
    const user = await userModel.find({ email }).limit(1)
    if (user.length == 0) {
        return null
    }
    return user[0]
}

const findByRecoveryToken = async (email: string) => {
    const user = await userModel.find({ email }).limit(1)
    if (user.length == 0) {
        return null
    }
    return user[0]
}

const findByPasswordRecoveryToken = async (recoverPasswordToken: string) => {
    const user = await userModel.find({ recoverPasswordToken }).limit(1)
    if (user.length == 0) {
        return null
    }
    return user[0]
}

export default {
    list,
    getByEmail,
    insert,
    update,
    deleteUser,
    getById,
    findByRecoveryToken,
    findByPasswordRecoveryToken
}