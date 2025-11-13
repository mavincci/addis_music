import { Router } from 'express'
import { checkHealth, healthPing } from './controllers/health-controller'
import {
  addSong,
  addMultipleSongs,
  deleteSong,
  getAllSongs,
  getSong,
  updateSong,
  getMetadata,
  getArtistStats,
  getAlbumStats,
  getSongsByArtist,
  getSongsByAlbum,
  getSongsByGenre,
} from './controllers/songs-controller'

const healthRouter = Router()

healthRouter.get('/', checkHealth)
healthRouter.get('/ping', healthPing)

const songsRouter = Router()

songsRouter.get('/', getAllSongs)
songsRouter.get('/metadata', getMetadata)
songsRouter.get('/stats/artists', getArtistStats)
songsRouter.get('/stats/albums', getAlbumStats)
songsRouter.get('/by-artist/:artist', getSongsByArtist)
songsRouter.get('/by-album/:album', getSongsByAlbum)
songsRouter.get('/by-genre/:genre', getSongsByGenre)
songsRouter.get('/:song_id', getSong)
songsRouter.post('/', addSong)
songsRouter.post('/multiple', addMultipleSongs)
songsRouter.put('/:song_id', updateSong)
songsRouter.delete('/:song_id', deleteSong)

export { healthRouter, songsRouter }
