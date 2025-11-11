import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'

import { healthRouter, songsRouter } from './routes'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()

app.use(json())

app.use('/api/health', healthRouter)
app.use('/api/songs', songsRouter)

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('DB: connected')
  } catch (error) {
    console.error('DB: connection error:', error)
  }
}

const startServer = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`addis_music running @[${port}]`)
  })
}

startServer()
