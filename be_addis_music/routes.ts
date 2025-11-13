import { Router } from 'express'
import { checkHealth, healthPing } from './controllers/health-controller'
import {
  addSong,
  addMultipleSongs,
  deleteSong,
  getAllSongs,
  getSong,
} from './controllers/songs-controller'

const healthRouter = Router()

healthRouter.get('/', checkHealth)
healthRouter.get('/ping', healthPing)

const songsRouter = Router()

songsRouter.get('/', getAllSongs)
songsRouter.get('/:song_id', getSong)
songsRouter.post('/', addSong)
songsRouter.post('/multiple', addMultipleSongs)
songsRouter.delete('/:song_id', deleteSong)

export { healthRouter, songsRouter }
