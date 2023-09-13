import * as crypto from 'crypto'

export const emailAndPasswordMatch = (password: string, incomingPassword: string) =>{
    let encrypthedPassword = password.split('$')
    let salt = encrypthedPassword[0]
    let hash = crypto.createHmac('sha512', salt).update(incomingPassword).digest('base64')
    if(encrypthedPassword[1] !== hash){
       throw new Error('Connect refused, bad credentials')
    }
}
