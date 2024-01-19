import { Request, Response } from 'express'
import petModel from '../model/pet.model'
import { JWTData, Pet } from '../../shared/types/types'
import { generateUuid } from '../../shared/utils/idGenerator'
import { generateQR } from '../../shared/services/qr-api.service'

export const list = async (_: Request, res: Response) => {
  try {
    const response: Pet[] | [] = await petModel.list()
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const listByUserId = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
    const petUserId: Pick<Pet, 'userId'> = { userId }

    const response = await petModel.listByUserId(petUserId)
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const insert = async (req: Request, res: Response) => {
  try {
    const pet: Pet = req.body    
    pet.publicCode = generateUuid()
    const response = await petModel.insert(pet)
    res.status(201).send(response)
  } catch (error) {
    console.log('error:', error)
    res.status(500).send('Internal Server Error')
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const petDataToUpdate = req.body
    console.log('petDataToUpdate:', petDataToUpdate);
    const response = await petModel.update(id, petDataToUpdate)
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const deletePet = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const response = await petModel.deletePet(id)
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id    
    const data : JWTData = req?.body?.jwtData?.data as JWTData;
    console.log('id:', id, 'data:', data)
    const response = await petModel.getByIdAndUserId(id,data.id)
    if(!response){
      res.status(400).send('Bad Request')
      return  
    }
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const getPetByPublicCode = async (req: Request, res: Response) => {
  try {
    const token: string = req.params.token
    const response = await petModel.getPetByPublicCode(token)
    if(!response){
      res.status(400).send('Bad Request')
      return  
    }
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const changePublicCode = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const petDataToUpdate: Pick<Pet, 'publicCode'> = {publicCode: generateUuid()}
    const response = await petModel.update(id, petDataToUpdate)
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

export const generateQRCode = async (req: Request, res: Response) => {
  try {
    const data: string = req.body.data
    const responseBlob: any = await generateQR(data)
    res.setHeader('Content-Type', 'image/png');
    const buffer = await responseBlob.arrayBuffer()
    res.status(200).send(Buffer.from(buffer))
  } catch (error) {
    console.log('err:', error)
    res.status(500).send('Internal Server Error')
  }
}