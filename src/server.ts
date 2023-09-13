import express from 'express'
import person from './person/route/person.route'
import user from './user/route/user.route'
import auth from './authorization/routes/auth.route'
import { connectToDb } from './shared/services/mongoose.service'
import * as dotenv from 'dotenv'
dotenv.config()

const app: express.Application = express()
const port: number | string = process.env.PORT || 3000

app.set('port', port)
app.use(express.json())

try {
    express.Router()
    app.use('/person/', person)
    app.use('/user/', user)
    app.use('/auth/', auth)
    connectToDb()
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
} catch (err) {
    console.log('Error in server configuration')
}
