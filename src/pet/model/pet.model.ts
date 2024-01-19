import { Schema, model } from 'mongoose'
import { Pet } from '../../shared/types/types'

let petSchema: any
let petModel: any

const defineMongooseSchema = () => {
    petSchema = new Schema<Pet>({
        name: { type: String },
        description: { type: String},
        age: { type: String },
        owner: { type: Object },
        species: { type: String },
        status: { type: Boolean },
        logBook: { type: [] },
        publicCode: {type: String},
        userId: { type: String },
        imageData: { type: Object }
    }, { timestamps: true })
}

const createMongooseModel = () => {
    petModel = model<Pet>('Pet', petSchema)
}

defineMongooseSchema()
createMongooseModel()

/* */

const list = async () => {
    const pets = await petModel.find({})
    return pets
}

const listByUserId = async (userId: Pick<Pet, 'userId'>) => {
    const pets = await petModel.find(userId)
    return pets
}

const insert = async (petData: Pet) => {
    const newPet = new petModel(petData)
    const savedPet = await newPet.save()
    return savedPet
}

const update = async (id: string, dataToUpdate: Object) => {
    const updatedPet = await petModel.findByIdAndUpdate(id, dataToUpdate, { new: true })
    return updatedPet
}

const deletePet = async (id: string) => {
    const deletedPet = await petModel.findByIdAndDelete(id)
    return deletedPet
}

const getById = async (id: string) => {
    const pet = await petModel.findById(id)
    return pet
}

const getByIdAndUserId = async (id: string,userId : string) => {
    const query = {_id:id,userId};
    const pet = await petModel.findOne(query)
    return pet
}

const getPetByPublicCode = async (publicCode: string) => {
    const pet = await petModel.findOne({publicCode})
    return pet
}

export default {
    list,
    listByUserId,
    insert,
    update,
    deletePet,
    getById,
    getByIdAndUserId,
    getPetByPublicCode
}
