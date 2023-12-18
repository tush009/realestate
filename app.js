import express from 'express'
import cors from 'cors'
import { landLordRouter } from './routes/landlord/landlordRoutes.js'
import { propertyRoutes } from './routes/property/propertyRoutes.js'
import { brokerRoutes } from './routes/broker/brokerRoutes.js'
import { authRoutes } from './routes/auth/loginRoutes.js'
import { morganMiddleware } from './middleware/morgan.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.options('*', cors())
app.use(morganMiddleware)

app.use('/api/v1/', authRoutes)
app.use('/api/v1/', landLordRouter)
app.use('/api/v1/', propertyRoutes)
app.use('/api/v1/', brokerRoutes)

export { app }
