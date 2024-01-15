import { Schema, model } from 'mongoose'
import { Person } from '../../shared/types/types'

let personSchema: any
let personModel: any

const defineMongooseSchema = () => {
    personSchema = new Schema<Person>({
        firstName: { type: String },
        middleName: { type: String },
        lastName: { type: String },
        emergencyContact: { type: String },
        secondLastName: { type: String },
        birthDate: { type: Date },
        rut: { type: String },
        status: { type: Boolean },
        medicalRecord: { type: Object },
        publicCode: {type: String},
        userId: { type: String },
        imageData: { type: Object }
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

const update = async (id: string, dataToUpdate: Object) => {
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

const getByIdAndUserId = async (id: string,userId : string) => {
    const query = {_id:id,userId};    
    const person = await personModel.findOne(query)
    return person
}

const getPersonByPublicCode = async (publicCode: string) => {
    const person = await personModel.findOne({publicCode})
    return person
}

export default {
    list,
    listByUserId,
    insert,
    update,
    deletePerson,
    getById,
    getByIdAndUserId,
    getPersonByPublicCode
}
