import { Request } from 'express'

export interface RequestWithJwt extends Request {
  jwt?: { [key: string]: any }
}

//person

export interface Person {
  firstName: String
  middleName?: String // El segundo nombre es opcional
  lastName: String
  secondLastName?: string // El segundo apellido es opcional
  birthDate: Date
  rut: String
  status: Boolean
  medicalRecord: MedicalRecord
  userId: String
}

export interface MedicalRecord {
  bloodType: string
  allergies?: string[]
  chronicConditions?: string[]
  medications?: Medication[]
}

export interface Medication {
  name: string
  dosage: string
  prescribedBy: string
  startDate: Date
  endDate?: Date
}

// user interface 

export interface User {
  name: string
  email: string
  phone: string
  password: string
  status?: boolean
  recoverPasswordToken?: string
  isConfirmed?: boolean
}

// authorization interface

export interface AuthData {
  email: string,
  password: string,
}
