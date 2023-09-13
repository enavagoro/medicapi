import { Schema, model } from 'mongoose'
import { Person } from '../../shared/types/types'

let personSchema: any
let personModel: any

const defineMongooseSchema = () => {
    personSchema = new Schema<Person>({
        firstName: { type: String},
        middleName: { type: String },
        lastName: { type: String },
        secondLastName: { type: String },
        birthDate: { type: Date },
        rut: { type: String },
        status: { type: Boolean },
        medicalRecord: { type: Object },
        userId: { type: String}
    }, { timestamps: true })
}

const createMongooseModel = () => {
    personModel = model<Person>('Person', personSchema)
}

defineMongooseSchema()
createMongooseModel()

/* */

const list = async () => {
    const persons = await personModel.find({})
    return persons
}

const listByUserId = async (userId: Pick<Person, 'userId'>) => {
    const persons = await personModel.find(userId)
    return persons
}

const insert = async (personData: Person) => {
    const newPerson = new personModel(personData)
    const savedPerson = await newPerson.save()
    return savedPerson
}

const update = async (id: string, dataToUpdate: Person) => {
    const updatedPerson = await personModel.findByIdAndUpdate(id, dataToUpdate, { new: true })
    return updatedPerson
}

const deletePerson = async (id: string) => {
    const deletedPerson = await personModel.findByIdAndDelete(id)
    return deletedPerson
}

const getById = async (id: string) => {
    const person = await personModel.findById(id)
    return person
}

export default {
    list,
    listByUserId,
    insert,
    update,
    deletePerson,
    getById
}
