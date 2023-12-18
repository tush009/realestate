import mongoose from 'mongoose'
import { config } from 'dotenv'
import { app } from './app.js'

config({ path: '.env' })
const PORT = process.env.PORT
const DB_URL = process.env.DATABASE_URL

let server
mongoose.connect(DB_URL).then(() => {
  console.log('Connected to MongoDB')
  server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.log(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.log('SIGTERM received')
  if (server) {
    server.close()
  }
})
