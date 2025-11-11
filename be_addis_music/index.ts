import dotenv from 'dotenv'
import express from 'express'
import { healthRouter, songsRouter } from './routes'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()

app.use('/api/health', healthRouter)
app.use('/api/songs', songsRouter)

app.listen(port, () => {
  console.log(`addis_music running @[${port}]`)
})
